<template>
    <!-- Header -->
    <div class="head text-center text-info">
        <h4>Login</h4>
        <hr />
    </div>
    <!-- Header -->
    <div>
        <div v-if="errors.message" class="alert alert-info" role="alert">
            {{ errors.message }}
        </div>
        
        <form @submit.prevent="loginHandler">
            
            <div class="form-group mb-3">
                <input v-model="form.email" type="email" class="form-control" placeholder="Enter email" name="email">
                <small v-if="errors.email" class="form-text text-danger">{{ errors.email[0] }}</small>
            </div>
            <div class="form-group mb-3">
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" name="password">
                <small v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</small>
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Login</button>
        </form>

        <div class="text-center mt-3">
            Don't have an account? <RouterLink to="/register">Register</RouterLink><br>
            <RouterLink to="/resetPassword/email">Forgot password?</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';
import router from '@/router';

const authStore = useAuthStore();

const { getErrors:errors } = storeToRefs(useAuthStore())

const form = reactive({
    email: '',
    password: ''
})

const loginHandler = () => {
    authStore.login(form)
    .then(() => {
        router.push({ name:'Todos' })
    })
}

</script>