<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3"></div>
      <div class="col-md-6">
        <div class="todoContainer card p-3 m-4 mt-5">
          <!-- Header -->
          <div class="head text-center text-info">
            <h4>List Your ToDo</h4>
            <hr />
          </div>
          <!-- Header -->

          <!-- Add Edit Section -->

          <!-- Input -->
          <div class="input-group mb-1 p-2" v-if="!editToDo">
            <input
              v-model="todocontent"
              type="text"
              class="form-control"
              placeholder="Enter Your Task..."
            />
            <button
              @click="submitBtnHandeler"
              class="btn btn-outline-secondary"
              type="button"
            >
              ADD
            </button>
          </div>
          <!-- Input -->

          <!-- Edit Section -->
          <div class="editToDo" v-else>
            <h5 class="text-center mt-1">Edit Your ToDo</h5>
            <div class="input-group mb-1 p-2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Your Task..."
                v-model="updateTodo.content"
              />
              <button
                @click="editToDo = false"
                class="btn btn-outline-secondary"
                type="button"
              >
                Cancel
              </button>
              <button
                @click="updateToDoButton(updateTodo.id)"
                class="btn btn-outline-secondary"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
          <!-- Edit Section -->
          <!-- Add Edit Section -->

          <!-- ToDo Lists -->
          <div class="todo_box p-2">
            <strong class="p-2">ToDo List</strong>
            <a @click.prevent="clearToDos" href="" style="float: right">
              {{ todos.length > 0 ? "Clear" : "" }}
            </a>

            <div class="todos">
              <!-- todo items -->
              <div class="todoItem" v-for="todo in todos" :key="todo.id">
                <div class="checkbox">
                  <input
                    v-model="todo.status"
                    class="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>

                <div
                  class="desc"
                  :class="{
                    'text-muted text-decoration-line-through':
                      todo.status == true,
                  }"
                >
                  {{ todo.content }}
                </div>
                <div class="editButton">
                  <div
                    @click="
                      editButtonHandeler(todo.id, todo.content),
                        (editToDo = true)
                    "
                    class="button button-sm button-primary"
                  >
                    <i class="fa-regular fa-pen-to-square"></i>
                  </div>
                </div>
                <div class="dltButton">
                  <div
                    @click="deleteButtonHandeler(todo.id)"
                    class="button button-sm button-danger"
                  >
                    <i class="fa-regular fa-trash-can"></i>
                  </div>
                </div>
              </div>
              <!-- todo items -->
            </div>
            <p class="text-center p-0 m-0">
              {{ todos.length == 0 ? "No Task Added" : "" }}
            </p>
          </div>
          <!-- ToDo Lists -->
        </div>
      </div>
      <div class="col-md-3"></div>
    </div>
  </div>
</template>

<script setup>
// imports
import { ref } from "vue";

// todos
const todos = ref([
  // {
  //   id: "id1",
  //   content: "Learn to Vue Router",
  //   status: false,
  // },
  // {
  //   id: "id2",
  //   content: "Learn to Vue Watcher",
  //   status: false,
  // },
]);

// input feild
const todocontent = ref();

// Add ToDo
const submitBtnHandeler = () => {
  let currentDate = new Date().getTime();
  let id = currentDate.toString();
  console.log(id);

  let todo = {
    id: id,
    content: todocontent.value,
    status: false,
  };
  todos.value.unshift(todo);

  todocontent.value = "";
};

// Delete Button
const deleteButtonHandeler = (deleteId) => {
  todos.value = todos.value.filter((todo) => todo.id !== deleteId);
};

const editToDo = ref(false);

const updateTodo = ref({});

// Edit Button
const editButtonHandeler = (editId, editContent) => {
  let todo = {
    id: editId,
    content: editContent,
  };
  updateTodo.value = todo;
};

// Update ToDo

const updateToDoButton = (updateId) => {
  const index = todos.value.findIndex((todo) => todo.id === updateId);
  todos.value[index].content = updateTodo.value.content;
  todos.value[index].status = false;

  editToDo.value = false;
};

// Clear ToDos
const clearToDos = () => {
  todos.value = !todos.value;
};
</script>

<style scope>
@import url(bootstrap/dist/css/bootstrap.min.css);
@import url(https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css);
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
.todoItem .editButton {
  width: 30px;
}
.todoItem .dltButton {
  width: 30px;
  float: right;
}
.editToDo {
  background: wheat;
  padding: 10px 5px;
  border-radius: 10px;
}
</style>
