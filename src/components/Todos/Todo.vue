<template>
  <div class="todoItem" :class="{
        'bg-light': todo.status == true,
      }">
    <div class="checkbox">
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
      {{ todo.content }}
      <span style="float: right; font-size: 16px; margin-top: 4px;">{{ dateFormatted }}</span>
    </div>
    <slot name="button"></slot>
    
    <div class="dltButton">
      <div
        @click="modals.deleteTodo = true"
        class="button button-sm button-danger"
      >
        <i class="fa-regular fa-trash-can"></i>
      </div>
    </div>
    <ModalDeleteTodo
        v-if="modals.deleteTodo"
        v-model="modals.deleteTodo"
        :todoId="todo.id"
      ></ModalDeleteTodo>
  </div>


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
</script>
