<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">

      <FlassMessage v-if="errors.message" v-model="errors.message"></FlassMessage>

      <!-- Navigation -->
      <Navbar></Navbar>
      <!-- Navigation -->
      <div class="todoContainer card p-3 mt-5 mb-5">
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
              :disabled="!todocontent || !authenticated"
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
        <div class="todo_box p-2" v-if="authenticated">
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
import { ref, onMounted } from "vue";
import AddEditTodo from "@/components/Todos/AddEditTodo.vue";
import Todo from "@/components/Todos/Todo.vue";
import Navbar from "@/components/Layout/Navbar.vue";
import { useTodoStore } from "@/stores/storeTodo";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/storeAuth";
import { storeToRefs } from "pinia";
import FlassMessage from "@/components/Layout/FlassMessage.vue";

// store
const todoStore = useTodoStore();
const { authenticated, getErrors:errors } = storeToRefs(useAuthStore());

onMounted(async() => {
  await todoStore.getTodos();
});

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
  todoStore.clearToDos();
};
</script>

<style scope>
.todoContainer {
  border-radius: 20px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}
.todoContainer .todo_box .todos{
  min-height: auto;
  max-height: 40vh;
  padding: 3px;
	overflow: auto;
}
.todos::-webkit-scrollbar {
	width:6px;
}
.todos::-webkit-scrollbar-track {
  box-shadow: inset 0 0 25px rgba(206, 206, 206, 0.70);
}
.todos::-webkit-scrollbar-thumb {
  background-color: rgb(110, 198, 233);
  border-radius: 10px;
}
.todoItem {
  width: 100%;
  padding: 5px;
  margin-top: 10px;
  background: white;
  border-radius: 7px;
  box-shadow: -1px 1px 5px 0px #d5d5d5;
  display: flex;
  position: relative;
  overflow: hidden;
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
  align-content: center;
}
.todoItem .checkbox input {
  border: 2px solid #a2e2ff;
}
.todoItem .desc {
  width: calc(100% - 30px);
}
.todoItem .desc p{
  margin-bottom: 0;
  text-wrap: nowrap;
  overflow: hidden;
}
.todoItem .desc span{
  float: left; 
  font-size: 15px;
}
.todoItem .edit_delete_bar{
  position: absolute;
  background: beige;
  border-right: 1px solid rgb(219, 219, 173);
  width: 70px;
  height: 65px;
  margin-top: -5px;
  right: -100px;
  display: flex;
  transition: all ease-in-out .5s;
}
.todoItem .dltButton, .todoItem .editButton{
  width: 50%;
  cursor: pointer;
  align-content: center;
  font-size: 22px;
}
.todoItem .dltButton {
  float: right;
}

.todoItem:hover .edit_delete_bar
{
  right: 0;
}
</style>
