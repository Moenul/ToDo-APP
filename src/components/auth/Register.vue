<template>
    <!-- Header -->
    <div class="head text-center text-info">
        <h4>Register</h4>
        <hr />
    </div>
    <!-- Header -->

    <div>
        <form @submit.prevent="registerHandaler(form)">
            <div class="form-group mb-3">
                <input v-model="form.name" type="text" class="form-control" placeholder="Enter your name" name="name">
                <small v-if="errors.name" class="form-text text-danger">{{ errors.name[0] }}</small>
            </div>
            <div class="form-group mb-3">
                <input v-model="form.email" type="email" class="form-control" placeholder="Enter email" name="email">
                <small v-if="errors.email" class="form-text text-danger">{{ errors.email[0] }}</small>
            </div>
            <div class="form-group mb-3">
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" name="password">
                <small v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</small>
            </div>
            <div class="form-group mb-3">
                <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Confirm your password" name="password_confirmation">
                <small v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</small>
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Register</button>
        </form>

        <div class="text-center mt-3">
            Already have an account? <RouterLink to="/login">Login</RouterLink><br>
            <RouterLink to="/resetPassword/email">Forgot password?</RouterLink>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';
import router from '@/router';

const { register } = useAuthStore();

const registerHandaler = (credential) => {
    register(credential).then(() => {
        router.push('/')
    })
}

const { getErrors:errors } = storeToRefs(useAuthStore())

const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

</script>