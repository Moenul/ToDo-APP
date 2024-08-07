import { createRouter, createWebHashHistory } from "vue-router"
import viewTodo from '@/views/viewTodo.vue'

const routes = [
    {
      path: "/",
      name: "Todos",
      component: viewTodo,
    },
    {
      path: "/editTodo/:id",
      name: "edit-todo",
      component: viewTodo,
    },
  ];

const router = createRouter({
history: createWebHashHistory(),
routes,
});


export default router;