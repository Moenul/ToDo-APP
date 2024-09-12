<template>
    <div v-if="errors.message" class="alert alert-info" role="alert">
        {{ errors.message }}
    </div>
</template>

<script setup>
import router from '@/router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/storeAuth';
import { onMounted } from 'vue';

const { getErrors:errors, getUser } = storeToRefs(useAuthStore())

const { verifyEmail } = useAuthStore()

const verifyEmailHandler = () => {
    const url = router.currentRoute.value.fullPath;
    const signeture = url.split('/api').join('');
    
    verifyEmail(signeture)
}


onMounted(() => {
    getUser
    verifyEmailHandler()
})


</script>