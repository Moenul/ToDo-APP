<template>
    <!-- Header -->
    <div class="head text-center text-info">
        <h4>Login</h4>
        <hr />
    </div>
    <!-- Header -->
    <div>
        <form @submit.prevent="authStore.login(form)">
            
            <div class="form-group mb-3">
                <input v-model="form.email" type="email" class="form-control" placeholder="Enter email" name="email" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <div class="form-group mb-3">
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" name="password" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Login</button>
        </form>

        <div class="text-center mt-3">
            Don't have an account? <RouterLink to="/register">Register</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { reactive } from 'vue';
import { useAuthStore } from '@/stores/storeAuth';

const authStore = useAuthStore();

const form = reactive({
    email: 'moenul22@gmail.com',
    password: 'password'
})

</script>