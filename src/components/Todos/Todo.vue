<template>
  <div class="todoItem" :class="{
        'bg-light': todo.status == true,
      }">
    <div class="checkbox">
      <input
        :checked="selectAll"
        @change="toggleSelectionHandler"
        class="form-check-input"
        type="checkbox"
      />
      <input
        :checked="todo.status"
        @input="todoStore.isCompleteTodo(todo.id)"
        class="form-check-input"
        type="checkbox"
      />
    </div>
    <div
      class="desc"
      :class="{
        'text-muted text-decoration-line-through': todo.status == true,
      }"
    >
      <p>{{ todo.content }}</p>
      <span>{{ dateFormatted }}</span>
    </div>
    <div class="edit_delete_bar">
      <slot name="button"></slot>
    
      <div class="dltButton">
        <div
          @click="modals.deleteTodo = true"
          class="button button-sm button-danger"
        >
          <i class="fa-regular fa-trash-can"></i>
        </div>
      </div>
      
    </div>
        
    
  </div>
        <ModalDeleteTodo
          v-if="modals.deleteTodo"
          v-model="modals.deleteTodo"
          :todoId="todo.id"
        ></ModalDeleteTodo>


</template>

<script setup>
import {reactive, computed} from 'vue'
import { useTodoStore } from '@/stores/storeTodo';
import ModalDeleteTodo from "@/components/Todos/ModalDeleteTodo.vue";
import { useDateFormat } from "@vueuse/core";

// store
const todoStore = useTodoStore();

const props = defineProps({
  todo: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    require: true,
  },
  selectAll: {
    type: Boolean,
    required: true
  }
});

// vueUse Date Formated
const dateFormatted = computed(() => {
  let date = new Date(parseInt(props.todo.date));
  const formated = useDateFormat(date, "DD MMM - hh:mm A");
  return formated.value;
});


// Modal delete
const modals = reactive({
  deleteTodo: false,
});

const emit = defineEmits(['toggleSelection'])

const toggleSelectionHandler = (event) => {
  emit('toggleSelection', props.todo)
}


</script>


<style scoped>
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
  display: inline-block;
  width: 50px;
  padding: 0px;
  align-content: center;
}
.todoItem .checkbox input {
  border: 2px solid #a2e2ff;
  margin: 6px 3px;
}
.todoItem .desc {
  width: calc(100% - 50px);
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

.todoItem .dltButton {
  float: right;
}

.todoItem:hover .edit_delete_bar
{
  right: 0;
}

</style>