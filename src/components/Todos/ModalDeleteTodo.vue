<template>
    <div class="card border border-warning confirmationModal">
        <div class="card-header border-b border-warning">
            Delete Note?
        </div>
        <div class="card-body">
            <p class="card-text">Are you sure to delete this todo?</p>
            
            <button @click="todoStore.deleteTodo(todoId)" class="btn btn-danger">Delete</button>
            <button @click="closeModal()" class="btn btn-primary">Cancel</button>
        </div>
    </div>
</template>

<script setup>
// imports
import { onMounted, onUnmounted, ref } from "vue";

import { useTodoStore } from '@/stores/storeTodo';

// store
const todoStore = useTodoStore();
  
// Props
const props = defineProps({
modelValue: {
    type: Boolean,
    default: false,
},
todoId: {
    type: String,
    required: true,
},
});

// emits
const emit = defineEmits(["update:modelValue"]);


// Close Modal
const closeModal = () => {
emit("update:modelValue", false);
};

// Keyboard Handeler
const handleKeybord = (e) => {
if (e.key === "Escape") closeModal();
};

onMounted(() => {
document.addEventListener("keyup", handleKeybord);
});

onUnmounted(() => {
document.removeEventListener("keyup", handleKeybord);
});
</script>

<style scoped>
.confirmationModal{
    position: absolute;
    width: 80%;
    top: 25%;
    left: 10%;
    z-index: 10;
}
.confirmationModal button{
    float: right;
    margin-left: 5px;
}

</style>