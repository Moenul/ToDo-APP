<template>
    <div>
        <div v-if="errors.message" class="alert alert-success" role="alert">
            {{ errors.message }}
        </div>
        <form @submit.prevent="sendEmailHandler(form)">
            <div class="form-group mb-3">
                <input v-model="form.email" type="email" class="form-control" placeholder="Enter your account email" name="email" required>
                <small v-if="errors.email" class="form-text text-danger">{{ errors.email[0] }}</small>
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Request Password Reset</button>

            <div class="text-center mt-3">
            Back to Login? <RouterLink to="/login">Login</RouterLink>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';

const { resetPassEmail } = useAuthStore()

const { getErrors:errors } = storeToRefs(useAuthStore())

const form = ref({
    email: ''
})

const sendEmailHandler = (credentials) => {
    resetPassEmail(credentials)
}

</script>