import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => {
    return {
        todos: [
            {
                id: "id1",
                content: "Learn to Vue Router",
                status: false,
            },
            {
                id: "id2",
                content: "Need to modified",
                status: true,
            }
        ]
    };
  },
  actions: {
    addTodo(newTodoContent){
        let currentDate = new Date().getTime();
        let id = currentDate.toString();

        let todo = {
            id: id,
            content: newTodoContent,
            status: false,
        };
        this.todos.unshift(todo);
    },
    saveTodo(id, content){
        let index = this.todos.findIndex((todo) => todo.id === id);
        this.todos[index].content = content;
        this.todos[index].status = false;
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