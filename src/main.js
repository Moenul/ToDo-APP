import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "@/router";
import axios from 'axios';
import { useAuthStore } from './stores/storeAuth';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

axios.interceptors.request.use( function(config) {
    const { getToken:token } = useAuthStore();

    if(token){
        config.headers.Authorization = `Bearer ${token}`

        localStorage.setItem('token', token)
    }

    return config
}, function(errors){
    return Promise.reject(errors)
})


const pinia = createPinia()

const app = createApp(App)

app.use(router).use(pinia)


const { attempt } = useAuthStore()

attempt(localStorage.getItem('token'))
.then(() => {
    app.mount('#app')
})