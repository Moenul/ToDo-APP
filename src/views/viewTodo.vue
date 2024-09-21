<template>
  <div class="row">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <FlassMessage
        v-if="errors.message"
        v-model="errors.message"
      ></FlassMessage>

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
              :disabled="!todocontent || !auth"
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
        <div class="todo_box p-2" v-if="auth">
          <strong class="p-2">ToDo List</strong>
          <a @click.prevent="clearToDos" href="" style="float: right">
            {{ todoStore.todos.length > 0 ? "Clear" : "" }}
          </a>

          <div class="action_section mb-1">
            <span v-show="todoStore.todos.length > 0" class="ms-2">
              <input
                @change="selectAllTodos"
                v-model="selectAll"
                class="form-check-input"
                style="margin-top: 6px"
                type="checkbox"
              />
              Select all
            </span>
            <button
              v-show="selectedTodos.length > 0"
              @click="bulkDelete"
              class="btn btn-sm btn-danger ms-4"
            >
              Delete Selected
            </button>
          </div>

          <div class="todos">
            <!-- todo items -->
            <draggable
              v-model="todoStore.todos"
              tag="div"
              drag-class="drag"
              ghost-class="ghost"
              :animation="300"
              item-key="id"
              @end="updateOrder"
            >
              <template #item="{ element: todo, index }">
                <div>
                  <Todo
                    :todo="todo"
                    :key="todo.id"
                    :index="index"
                    @toggle-selection="toggleSelection"
                    :select-all="selectAll"
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
                </div>
              </template>
            </draggable>

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
import { ref, onMounted, computed } from "vue";
import AddEditTodo from "@/components/Todos/AddEditTodo.vue";
import Todo from "@/components/Todos/Todo.vue";
import Navbar from "@/components/Layout/Navbar.vue";
import { useTodoStore } from "@/stores/storeTodo";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/storeAuth";
import { storeToRefs } from "pinia";
import FlassMessage from "@/components/Layout/FlassMessage.vue";
import draggable from "vuedraggable";

// store
const todoStore = useTodoStore();
const {
  authenticated: auth,
  getErrors: errors,
  getUser: user,
} = storeToRefs(useAuthStore());

onMounted(async () => {
  await todoStore.getTodos();
});

// route and router
const route = useRoute();
const router = useRouter();

// input feild
const todocontent = ref("");

// Add ToDo
const addTodo = () => {
  let credentials = {
    user_id: user.value.id,
    content: todocontent.value,
  };
  todoStore.addTodo(credentials);
  todocontent.value = "";
};

// edit todo
const updateTodo = ref({});

router.afterEach((to, from) => {
  let todo = {
    id: route.params.id,
    content: todoStore.getTodoContent(route.params.id),
  };

  updateTodo.value = todo;
});

// Update ToDo

const handleToSaveTodo = () => {
  todoStore.saveTodo(route.params.id, updateTodo.value.content);
  router.push("/");
};

// Clear ToDos
const clearToDos = () => {
  todoStore.clearToDos();
};

const selectedTodos = ref([]);

const toggleSelection = (todo) => {
  const index = selectedTodos.value.indexOf(todo.id);

  if (index === -1) {
    selectedTodos.value.push(todo.id);
  } else {
    selectedTodos.value.splice(index, 1);
  }
};

const bulkDelete = () => {
  todoStore.bulkDelete(selectedTodos.value);
};

const selectAll = ref(false);

const selectAllTodos = () => {
  if (selectAll.value) {
    selectedTodos.value = todoStore.todos.map((todo) => todo.id);
  } else {
    selectedTodos.value = [];
  }};

const updateOrder = (event) => {
  const newOrder = event.newIndex;
  const oldOrder = event.oldIndex;

  todoStore.updateOrder(newOrder, oldOrder)
}

</script>

<style scope>
.todoContainer {
  border-radius: 20px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}
.todoContainer .todo_box .todos {
  min-height: auto;
  max-height: 40vh;
  padding: 3px;
  overflow: auto;
}
.todos::-webkit-scrollbar {
  width: 6px;
}
.todos::-webkit-scrollbar-track {
  box-shadow: inset 0 0 25px rgba(206, 206, 206, 0.7);
}
.todos::-webkit-scrollbar-thumb {
  background-color: rgb(110, 198, 233);
  border-radius: 10px;
}

.todoItem .dltButton,
.todoItem .editButton {
  width: 50%;
  cursor: pointer;
  align-content: center;
  font-size: 22px;
  padding: 2px 8px;
}

.drag > div {
  transform: scale(.9);
}
.ghost{
  background: rgb(233, 233, 233);
  border-radius: 2px;
}
.ghost > div{
  visibility: hidden;
}
</style>
