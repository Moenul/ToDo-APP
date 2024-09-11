<template>
    <div>
        <div v-if="errors.message" class="alert alert-info" role="alert">
            {{ errors.message }}
        </div>
        <form @submit.prevent="resetPassHandler(form)">
            <div class="form-group mb-3">
                <input v-model="form.password" type="password" class="form-control" placeholder="Password" name="password">
                <!-- <small v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</small> -->
            </div>
            <div class="form-group mb-3">
                <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Confirm your password" name="password_confirmation">
                <small v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</small>
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Reset Password</button>

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
import router from '@/router';

const { resetPassword } = useAuthStore()

const { getErrors:errors } = storeToRefs(useAuthStore())

const form = ref({
    password: '',
    password_confirmation: '',
})


const resetPassHandler = (credentials) => {
    const url = router.currentRoute.value.fullPath;
    const signeture = url.split('/api').join('');
    
    resetPassword(signeture, credentials)
}

</script>