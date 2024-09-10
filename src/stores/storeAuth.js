import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            token: null,
            user: null
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
            try {
                let response = await axios.get('/user', {
                    headers: {
                        "Authorization" : `${token.token_type} ${token.access_token}`
                    }
                })

                this.setToken(token.access_token)
                this.setUser(response.data.user)
            } catch (e) {
                throw e
            }
        },

        async login(credentials){
            try{
                await axios.post('/login',{
                    email: credentials.email,
                    password: credentials.password
                }).then(response => {
                    this.attempt(response.data)
                })
            } catch (e){
                throw e
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
        }
    }
})