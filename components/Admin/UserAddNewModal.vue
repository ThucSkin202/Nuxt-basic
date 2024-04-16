<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <!-- <button type="button"
                                    class="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-500"
                                    @click="closeModal">
                                    <span class="text-xl">x</span>
                                </button> -->
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900">
                                        New User
                                    </DialogTitle>
                                </div>
                            </div>
                            <div class="mt-5">
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Username
                                    <label class="text-red-500">*</label></label>
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <input v-model="username" type="text" name="username" id="username"
                                        class="block w-full rounded-md border-0 pl-3 py-1.5 pr-10  ring-1 ring-insetsm:text-sm sm:leading-6"
                                        aria-invalid="true" aria-describedby="name-error" />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                </div>

                            </div>
                            <div class="mt-5">
                                <label for="description"
                                    class="block text-sm font-medium leading-6 text-gray-900">Password
                                    <label class="text-red-500">*</label></label>
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <input v-model="password" type="password" name="password" id="description"
                                        class="block w-full rounded-md border-0 pl-3 py-1.5 pr-10  ring-1 ring-insetsm:text-sm sm:leading-6"
                                        aria-invalid="true" aria-describedby="name-error" />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                            <div class="mt-5">
                                <label for="description"
                                    class="block text-sm font-medium leading-6 text-gray-900">Confirm Password
                                    <label class="text-red-500">*</label></label>
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <input v-model="confirmPassword" type="password" name="confirmPassword"
                                        id="description"
                                        class="block w-full rounded-md border-0 pl-3 py-1.5 pr-10  ring-1 ring-insetsm:text-sm sm:leading-6"
                                        aria-invalid="true" aria-describedby="name-error" />
                                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
                                    </div>
                                </div>
                            </div>
                            <div v-if="authStore.errorMessage" class="text-red-500 mt-4">{{ authStore.errorMessage }}
                            </div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button @click="hanldeCreateUser"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                    Create
                                </button>
                                <button
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="closeModal">
                                    Cancel
                                </button>

                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

const hanldeCreateUser = async () => {
    try {
        if (password.value !== confirmPassword.value) {
            authStore.errorMessage = 'Mật khẩu không trùng khớp';
            return;
        }

        await authStore.register(username.value, password.value);

    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        authStore.errorMessage = 'Lỗi kết nối';
    }
}


import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)
const closeModal = () => {
    open.value = false
}
</script>