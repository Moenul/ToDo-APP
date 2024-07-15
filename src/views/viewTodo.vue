<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <!-- Navigation -->
      <div class="nav d-block card p-3 m-4 mt-5">
        <div class="use_info w-75 d-inline-block">
          <div class="row">
            <div class="col-2">
              <img class="rounded-circle border border-info shadow-sm" style="width: 54px; overflow: hidden;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlCLUUa5t9Q5fC3sR8353U21-qY5qUt0i_pA&s" alt="">
            </div>
            <div class="col-10">
              <p class="m-0">User Full Name</p>
              <span class="text-muted" style="font-size: 16px;">moenul22@gmail.com</span>
            </div>
          </div>
        </div>
        <div class="button text-danger m-0">
          <iconify-icon icon="lets-icons:on-button-duotone"></iconify-icon>
        </div>

        <div class="todo_info d-block mt-2">
          <div class="row">
            <div class="col-2 d-inline-flex"><iconify-icon class="text-success" icon="weui:done2-filled" style="font-size: 23px; margin-right: 4px;"></iconify-icon> 10</div>
            <div class="col-2 d-inline-flex"><iconify-icon class="text-warning" icon="fluent:calendar-clock-16-filled" style="font-size: 23px; margin-right: 4px;"></iconify-icon> 5</div>
            <div class="col-8 d-inline-flex"><iconify-icon class="text-primary" icon="majesticons:clock" style="font-size: 23px; margin-right: 4px;"></iconify-icon> 25 Jul 2024</div>
          </div>
        </div>

        
      </div>
      
      <!-- if not sign in -->
      <!-- <div class="nav d-block card p-3 m-4 mt-5">
        <span class="title">SignIn to add task</span>
        <div class="button text-info">
          <iconify-icon icon="lets-icons:on-button-duotone"></iconify-icon>
        </div>
      </div> -->
      <!-- if not sign in -->

      <!-- Navigation -->
      <div class="todoContainer card p-3 m-4 mt-5">
        <!-- Header -->
        <div class="head text-center text-info">
          <h4>List Your ToDo</h4>
          <hr />
        </div>
        <!-- Header -->

        <!-- Add Edit Section -->
        <AddEditTodo
          v-model="todocontent"
          placeholder="Enter Your Task ..."
          
          v-if="$route.name !== 'edit-todo'"
        >
          <template v-slot:button>
            <button
              @click="addTodo"
              class="btn btn-outline-success"
              :disabled="!todocontent"
              type="button"
            >
              ADD
            </button>
          </template>
        </AddEditTodo>

        <!-- Edit Section -->
        <div class="editToDo bg-light rounded border" v-else>
          <h5 class="text-center mt-2">Edit Your ToDo</h5>
          <AddEditTodo
            v-model="updateTodo.content"
            placeholder="Edit Your Task ..."
          >
            <template v-slot:button>
              <button
                @click="$router.push('/')"
                class="btn btn-outline-danger"
                type="button"
              >
                Cancel
              </button>
              <button
                @click="handleToSaveTodo"
                :disabled="!updateTodo"
                class="btn btn-outline-success"
                type="button"
              >
                Save
              </button>
            </template>
          </AddEditTodo>
        </div>
        <!-- Edit Section -->

        <!-- Add Edit Section -->

        <!-- ToDo Lists -->
        <div class="todo_box p-2">
          <strong class="p-2">ToDo List</strong>
          <a @click.prevent="clearToDos" href="" style="float: right">
            {{ todoStore.todos.length > 0 ? "Clear" : "" }}
          </a>

          <div class="todos">
            <!-- todo items -->
            <Todo
              v-for="(todo, index) in todoStore.todos"
              :index="index"
              :todo="todo"
              :key="todo.id"
            >
              <template v-slot:button>
                <div class="editButton">
                  <RouterLink
                    :to="`/editTodo/${todo.id}`"
                    href="#"
                    class="card-footer-item text-dark"
                    >
                    <div class="button button-sm button-primary">
                      <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                  </RouterLink>
                </div>
              </template>
            </Todo>

            <!-- todo items -->
          </div>
          <p class="text-center p-0 m-0">
            {{ todoStore.todos.length == 0 ? "No Task Added" : "" }}
          </p>
        </div>
        <!-- ToDo Lists -->
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>
<script setup>
// imports
import { ref } from "vue";
import AddEditTodo from "@/components/Todos/AddEditTodo.vue";
import Todo from "@/components/Todos/Todo.vue";
import { useTodoStore } from "@/stores/storeTodo";
import { useRoute, useRouter } from "vue-router";

// store
const todoStore = useTodoStore();

// route and router 
const route = useRoute();
const router = useRouter();

// input feild
const todocontent = ref("");

// Add ToDo
const addTodo = () => {
  todoStore.addTodo(todocontent.value);
  todocontent.value = "";
};


// edit todo
const updateTodo = ref({});

router.afterEach((to, from) => {
  let todo = {
    id: route.params.id,
    content: todoStore.getTodoContent(route.params.id),
  }

  updateTodo.value = todo;
})

// Update ToDo

const handleToSaveTodo = () => {
  todoStore.saveTodo(route.params.id, updateTodo.value.content);
  router.push("/");
};

// Clear ToDos
const clearToDos = () => {
  todoStore.todos = [];
};
</script>

<style scope>
.todoContainer {
  border-radius: 20px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}
.todoItem {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  background: white;
  border-radius: 5px;
  box-shadow: -1px 1px 5px 0px #e7e7e7;
  display: block;
}
.todoItem .checkbox,
.desc,
.editButton,
.dltButton {
  display: inline-flex;
  padding: 2px 8px;
}
.todoItem .checkbox {
  width: 30px;
}
.todoItem .checkbox input {
  border: 2px solid #a2e2ff;
}
.todoItem .desc {
  width: calc(100% - 90px);
}

.todoItem .dltButton, .todoItem .editButton{
  width: 30px;
  visibility: hidden;
  opacity: 0;
  transition: all ease-in-out .5s;
  cursor: pointer;
}

.todoItem .dltButton {
  float: right;
}

.todoItem:hover .editButton,
.todoItem:hover .dltButton{
  visibility: visible;
  opacity: 1;
}
/* Nav section */
.nav{
  border-radius: 15px;
    border: 1px solid #e4e4e4;
    box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}
.nav .todo_info{
  font-size: 16px;
}
.nav .title{
  width: 85%;
  display: inline-block;
}
.nav .button{
  width: 40px;
  float: right;
  font-size: 38px;
  margin-top: -10px;
  cursor: pointer;
}

</style>
