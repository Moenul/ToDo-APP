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
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/tasks`)
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
      axios.post(`http://127.0.0.1:8000/api/v1/tasks`, {content: newTodoContent})
      .then(response => {
        const data = response.data.data;
        let todo = {
          id: data.id,
          content: data.content,
          status: data.status,
          date: data.created_at,
        };
        this.todos.unshift(todo);
        console.log(response)
      })
    },
    async saveTodo(id, content){
      await axios.put(`http://127.0.0.1:8000/api/v1/tasks/${id}`, {content: content, is_completed: false})
      .then(response => {
        const data = response.data.data;
        let index = this.todos.findIndex((todo) => todo.id === data.id);
        this.todos[index].content = data.content;
        this.todos[index].status = data.status;
        this.todos[index].date = data.created_at;
        console.log(response)
      })
    },
    async isCompleteTodo(id){
      let index = this.todos.findIndex((todo) => todo.id === id);
      let status = !this.todos[index].status;

      await axios.patch(`http://127.0.0.1:8000/api/v1/tasks/${id}/complete`, {is_completed: status})
      .then(response => {
        this.todos[index].status = !this.todos[index].status;
        console.log(response)
      })
    },
    deleteTodo(idToDelete){
      axios.delete(`http://127.0.0.1:8000/api/v1/tasks/${idToDelete}`);
      this.todos = this.todos.filter((todo) => todo.id !== idToDelete);
    },
    clearToDos(){
      axios.post(`http://127.0.0.1:8000/api/v1/tasks/truncate`)
      this.todos = [];
    }
  },
  getters: {
    getTodoContent: (state) => {
      return (id) => {
        return state.todos.filter((todo) => todo.id == id)[0].content;
      };
    },
  },
})