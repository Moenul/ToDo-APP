import { createRouter, createWebHashHistory } from "vue-router"
import viewTodo from '@/views/viewTodo.vue'
import viewAuth from "@/views/viewAuth.vue";

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
    {
      path: "/login",
      name: "login",
      component: viewAuth,
    },
    {
      path: "/register",
      name: "register",
      component: viewAuth,
    },
    {
      path: "/resetPassword/email",
      name: "resetPasswordEmail",
      component: viewAuth,
    },
    {
      path: "/api/password/reset",
      name: "resetPassword",
      component: viewAuth,
    },
    {
      path: "/emailVerifyMail",
      name: "emailVerifyMail",
      component: viewAuth,
    },
    {
      path: "/api/email/verify",
      name: "emailVerify",
      component: viewAuth,
    },

  ];

const router = createRouter({
history: createWebHashHistory(),
routes,
});


export default router;