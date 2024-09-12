import { defineStore } from "pinia";
import axios from "axios";
import router from '@/router';


export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            token: null,
            user: null,
            errors:""
        }
    },
    actions: {
        setToken(token){
            this.token = token;
        },
        setUser(user){
            this.user = user;
        },
        async attempt(token){
            if (token) {
                this.setToken(token);
            }

            if (!this.token) {
                return;
            }

            try {
                let response = await axios.get('/user')

                this.setUser(response.data.user)

                return response
            } catch (e) {

                this.setToken(null)
                this.setUser(null)
                localStorage.removeItem('token')

                throw e
            }
        },

        async login(credentials){
            try{
                await axios.post('/login',{
                    email: credentials.email,
                    password: credentials.password
                }).then(response => {
                    this.attempt(response.data.access_token)
                    console.log(response.data.access_token)
                })
            } catch (e){
                if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }else if(e.response.status === 401){
                    this.errors = {"password": [e.response.data.message]}
                }
                throw e
            }
        },

        async logout(){
            try {
                let response = await axios.post('/logout')

                this.setToken(null)
                this.setUser(null)
                localStorage.removeItem('token')
                return response
            } catch (e) {
                this.setToken(null)
                this.setUser(null)
                localStorage.removeItem('token')
            }
        },

        async register(credentials){
            try {
                await axios.post('/register', {
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation,
                }).then(response => {
                    this.attempt(response.data.access_token)
                })
            } catch (e) {
                if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
                throw e
            }
        },

        async resetPassEmail(credentials){
            try {
                await axios.post('/password/email',{
                    email: credentials.email
                })
                .then(response => {
                    console.log(response);
                    
                    if(response.status === 200){
                        this.errors = response.data
                        console.log(response.data);
                    }
                })
            } catch (e) {
                if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
                throw e
            }
        },

        async resetPassword(signeture, credentials){
            try {
                await axios.post(signeture,{
                    password: credentials.password,
                    password_confirmation: credentials.password_confirmation
                })
                .then(response => {
                    if(response.status === 200){
                        this.errors = response.data

                        router.push({ name:'login' })
                    }
                })
            } catch (e) {
                if(e.response.status === 403){
                    this.errors = e.response.data
                }else if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
            }
        },

        async emailVerifiyMail(){
            try {
                await axios.post('/email/verify/send',{
                    email: this.user.email
                })
                .then(response => {
                    if(response.status === 200){
                        this.errors = response.data
                    }
                })
            } catch (e) {
                if(e.response.status === 403){
                    this.errors = e.response.data
                }else if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
            }
        },

        async verifyEmail(signeture){
            try {
                await axios.post(signeture)
                .then(response => {
                    if(response.status === 200){
                        this.errors = response.data
                    }
                    router.push({name: 'Todos'})
                    this.user.email_verified_at = Date.now()
                })
            } catch (e) {
                if(e.response.status === 403){
                    this.errors = e.response.data
                }else if(e.response.status === 422){
                    this.errors = e.response.data.errors
                }
            }
        }
    },
    getters: {
        authenticated(){
            return !!this.token && !!this.user
        },
        getToken(){
            return this.token
        },
        getUser(){
            return this.user
        },
        getErrors(){
            return this.errors
        }
    }
})