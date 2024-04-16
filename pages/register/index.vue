<template>
    <div>
        <h1 class="text-3xl mt-3 sm:mt-5 font-semibold mb-4 text-center">Đăng ký</h1>

        <form @submit.prevent="register" class="max-w-md mx-auto">
            <div class="mb-4">
                <label for="username" class="block text-gray-700">Tên người dùng:</label>
                <input type="text" id="username" v-model="username" class="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div class="mb-4">
                <label for="password" class="block text-gray-700">Mật khẩu:</label>
                <input type="password" id="password" v-model="password" class="mt-1 p-2 border rounded-md w-full" />
            </div>
            <div class="mb-4">
                <label for="confirmPassword" class="block text-gray-700">Nhập lại mật khẩu:</label>
                <input type="password" id="confirmPassword" v-model="confirmPassword"
                    class="mt-1 p-2 border rounded-md w-full" />
            </div>
            <button type="submit" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Đăng ký</button>
            <div v-if="authStore.errorMessage" class="text-red-500 mt-4">{{ authStore.errorMessage }}</div>
        </form>

        <div class="text-center mt-6">
            <p class="text-gray-700">Đã có tài khoản?</p>
            <NuxtLink to="/login" class="text-blue-500 underline">Đăng nhập</NuxtLink>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'is-logged-in',
})

import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const register = async () => {
    try {
        if (password.value !== confirmPassword.value) {
            authStore.errorMessage = 'Mật khẩu không trùng khớp';
            return;
        }

        await authStore.register(username.value, password.value);

        router.push('/login');
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        authStore.errorMessage = 'Lỗi kết nối';
    }
};
</script>
