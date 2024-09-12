<template>
    <div v-show="flassmessage" class="alert alert-info alert-block" role="alert" id="flash_messsage">
        <strong class="text-dark">{{ props.modelValue }}</strong>
        <button @click="closeFlass" type="button" class="btn-close float-end"></button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
    modelValue: {
        type: Object,
        require: true,
    }
})


onMounted(async() => {
  setTimeout(() => {
    flassmessage.value = !flassmessage.value
  }, 3000);
});




const flassmessage = ref(true)

const closeFlass = () => {
  flassmessage.value = !flassmessage.value
}
</script>

<style scoped>
/* Flash Message */

#flash_messsage{
  width: 500px;
  padding: 8px 8px 8px 20px;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 32%);
}
#flash_messsage strong{
    font-size: 16px;
}

</style>