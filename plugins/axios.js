import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.baseURL = 'https://laco-auth.10z.one'
    axios.defaults.withCredentials = false;
    axios.defaults.proxyHeaders = false;
    if (process.client) {
        const token = window.localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        }
    }
    return {
        provide: {
            axios: axios
        },
    }
})