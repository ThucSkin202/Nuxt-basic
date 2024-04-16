<template>
    <div>
        <header class="shadow-sm bg-white  text-cyan-600">
            <nav class="container mx-auto p-4 flex justify-between">
                <nuxt-link to="/admin/roles" class="font-bold">Admin Dashboard</nuxt-link>
                <ul class="flex gap-4">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><nuxt-link to="/admin/roles">Roles</nuxt-link></li>
                    <li><nuxt-link to="/admin/permissions">Permissions</nuxt-link></li>
                    <li><nuxt-link to="/admin/users">Users</nuxt-link></li>
                    <template v-if="authStore.isLoggedIn">
                        <button class="ml-4" @click="handleLogout">Logout</button>
                    </template>
                </ul>
            </nav>
        </header>
        <slot />
    </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    try {
        authStore.logout()
        router.push('/login');

    } catch (error) {
        console.error('Logout error:', error);
    }
};

</script>

<style scoped></style>