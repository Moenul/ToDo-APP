<template>
    <div v-if="errors.message" class="alert alert-info" role="alert">
        {{ errors.message }}
    </div>
    <div class="text-center">
        <RouterLink @click="emailVerifiyMail" v-if="auth" to="#" class="btn btn-primary btn-sm">Click to verify</RouterLink>
    </div>
    
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';

const {authenticated:auth, getErrors:errors} = storeToRefs(useAuthStore())

const { emailVerifiyMail } = useAuthStore()


</script>
