import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore();

    if (to.fullPath === '/login' && authStore.isLoggedIn) {
        return navigateTo('/')
    }

    if (to.fullPath === '/register' && authStore.isLoggedIn) {
        return navigateTo('/')
    }
})