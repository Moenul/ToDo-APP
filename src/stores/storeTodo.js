import { defineStore } from 'pinia'
import axios, { Axios } from "axios";

export const useTodoStore = defineStore('todoStore', {
  state: () => {
    return {
        todos: []
    };
  },
  actions: {
    async getTodos() {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/tasks')
      try{
        response.data.data.forEach((data) => {
          let todo = {
            id: data.id,
            content: data.content,
            status: data.is_completed,
            date: data.created_at
          };
          this.todos.push(todo);
        });
      }catch(err){
        console.log(err)
      }
    },
    addTodo(newTodoContent){
        let currentDate = new Date().getTime();
        let id = currentDate.toString();

        let todo = {
            id: id,
            content: newTodoContent,
            status: false,
            date: Date.now(),
        };
        this.todos.unshift(todo);
    },
    saveTodo(id, content){
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos[index].content = content;
        this.todos[index].status = false;
        this.todos[index].date = Date.now();
    },
    isCompleteTodo(id){
      let index = this.todos.findIndex((todo) => todo.id === id);
      this.todos[index].status = !this.todos[index].status;
    },
    deleteTodo(idToDelete){
        this.todos = this.todos.filter((todo) => todo.id !== idToDelete);
    }
  },
  getters: {
    getTodoContent: (state) => {
      return (id) => {
        return state.todos.filter((todo) => todo.id === id)[0].content;
      };
    },
  },
})