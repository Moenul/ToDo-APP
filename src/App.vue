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

          <!-- Input -->
          <div class="input-group mb-1 p-2">
            <input
              type="text"
              class="form-control"
              placeholder="Write your task name"
            />
            <button class="btn btn-outline-secondary" type="button">ADD</button>
          </div>
          <!-- Input -->

          <!-- ToDo Lists -->
          <div class="todo_box p-2">
            <strong class="p-2">ToDo List</strong>

            <div class="todos">
              <!-- todo items -->
              <div class="todoItem" v-for="i in 5">
                <div class="checkbox">
                  <input class="form-check-input" type="checkbox" value="" />
                </div>
                <div class="desc">Some text here about of task and details</div>
                <div class="dltButton">
                  <div class="button button-sm button-danger deleteButton">
                    <i class="fa-regular fa-trash-can"></i>
                  </div>
                </div>
              </div>
              <!-- todo items -->
            </div>
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
  width: calc(100% - 60px);
}
.todoItem .dltButton {
  width: 30px;
  float: right;
}
</style>
