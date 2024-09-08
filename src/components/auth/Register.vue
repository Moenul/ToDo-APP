<template>
    <!-- Header -->
    <div class="head text-center text-info">
        <h4>Register</h4>
        <hr />
    </div>
    <!-- Header -->

    <div>
        <form>
            <div class="form-group mb-3">
                <input type="text" class="form-control" placeholder="Enter your name" name="name" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <div class="form-group mb-3">
                <input type="email" class="form-control" placeholder="Enter email" name="email" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <div class="form-group mb-3">
                <input type="password" class="form-control" placeholder="Password" name="password" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <div class="form-group mb-3">
                <input type="password_confirmation" class="form-control" placeholder="Confirm your password" name="password_confirmation" required>
                <!-- <small class="form-text text-muted">Errr.</small> -->
            </div>
            <button type="submit" class="btn btn-block btn-primary col-12">Register</button>
        </form>

        <div class="text-center mt-3">
            Already have an account? <RouterLink to="/login">Login</RouterLink>
        </div>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router';
</script>