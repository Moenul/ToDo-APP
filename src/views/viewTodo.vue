<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <!-- Navigation -->
      <Navbar></Navbar>
      <!-- Navigation -->
      <div class="todoContainer card p-3 mt-5">
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
import Navbar from "@/components/Layout/Navbar.vue";
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
  display: inline-block;
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


</style>
