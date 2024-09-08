<template>
    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
            <div class="section d-block card p-3 mt-5">
                <Login v-if="$route.name == 'login'"></Login>
                <Register v-if="$route.name == 'register'"></Register>
                <EmailVerify v-if="$route.name == 'emailVerify'"></EmailVerify>
                <ForgotPassword v-if="$route.name == 'forgotPassword'"></ForgotPassword>
            </div>
        </div>
        <div class="col-md-3"></div>
    </div>
</template>

<script setup>
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import EmailVerify from '@/components/auth/EmailVerify.vue';
import ForgotPassword from '@/components/auth/ForgotPassword.vue';
</script>

<style scoped>
.section{
    border-radius: 15px;
    border: 1px solid #e4e4e4;
    box-shadow: 0 0 0 0.2rem rgb(214 214 214 / 17%);
}


</style>