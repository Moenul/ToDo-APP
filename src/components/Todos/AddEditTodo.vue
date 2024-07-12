<template>
    <!-- Input -->
    <div class="input-group mb-1 p-2">
    <input
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        type="text"
        class="form-control"
        :placeholder="placeholder"
    />
    <slot name="button"></slot>
    </div>
    <!-- Input -->
</template>
<script setup>
// imports
import { ref } from "vue";

// props
const props = defineProps({
    modelValue: {
        type: String,
        require: true,
    },
    placeholder: {
        type: String,
        require: true
    }
})

// emits
const emit = defineEmits(["update:modelValue"]);

</script>