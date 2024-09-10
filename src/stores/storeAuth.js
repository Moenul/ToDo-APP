import { defineStore } from "pinia";
import axios from "axios";

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