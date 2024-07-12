<template>
  <div class="todoItem">
    <div class="checkbox">
      <input
        :checked="todo.status"
        @input="$emit('toggle-status', index)"
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
    </div>
    <slot name="button"></slot>
    
    <div class="dltButton">
      <div
        @click="$emit('delete-todo', todo.id)"
        class="button button-sm button-danger"
      >
        <i class="fa-regular fa-trash-can"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
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

// emits
const emit = defineEmits(['toggle-status','delete-todo']);
</script>
