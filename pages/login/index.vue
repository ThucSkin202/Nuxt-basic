<template>
    <div>
        <h1 class="text-3xl mt-3 sm:mt-5 font-semibold mb-4 text-center">Đăng nhập</h1>

        <form @submit.prevent="login" class="max-w-md mx-auto">
            <div class="mb-4">
                <label for="username" class="block text-gray-700">Tên người dùng:</label>
                <input type="text" id="username" v-model="username" class="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700">Mật khẩu:</label>
                <input type="password" id="password" v-model="password" class="mt-1 p-2 border rounded-md w-full" />
            </div>
            <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Đăng nhập</button>
            <div v-if="authStore.errorMessage" class="text-red-500 mt-4">{{ authStore.errorMessage }}</div>
        </form>

        <div class="text-center mt-6">
            <p class="text-gray-700">Chưa có tài khoản?</p>
            <NuxtLink to="/register" class="text-blue-500 underline">Đăng ký</NuxtLink>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'is-logged-in'
})

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const login = async () => {
    try {
        await authStore.login(username.value, password.value);

        if (process.client) {
            const token = localStorage.getItem('token');

            if (token || authStore.accessToken) {
                router.replace('/');
            }
        }
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        authStore.errorMessage = 'Lỗi kết nối';
    }
};
</script>
