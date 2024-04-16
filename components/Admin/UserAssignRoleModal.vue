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
                                        Assign Role
                                    </DialogTitle>
                                </div>
                            </div>
                            <div class="mt-5">
                                <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role
                                    <label class="text-red-500">*</label>
                                </label>
                                <div class="relative m-4 rounded-md shadow-sm">
                                    <select v-model="selectedRole" name="role" id="role"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 sm:text-sm appearance-none bg-white bg-opacity-50 pl-3 pr-10 py-1.5">
                                        <option value="661c91249e8e16a32504ebf6">Directer</option>
                                        <option value="6615215d7e6b08ed157785f0">Manager</option>
                                    </select>
                                    <div
                                        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M10 12l-6-6 1.5-1.5L10 9.5 16.5 3 18 4.5z"
                                                clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div v-if="authStore.errorMessage" class="text-red-500 mt-4">{{ authStore.errorMessage }}
                            </div>

                            <div class="mt-5 sm:mt-10 sm:flex sm:flex-row-reverse">
                                <button @click="hanldeAssignRoleUser"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">
                                    Create
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
import { ref, onMounted } from 'vue'

const props = defineProps(['id'])

const { id } = props;

const authStore = useAuthStore();

const hanldeAssignRoleUser = async () => {
    try {
        if (!selectedRole.value) {
            authStore.errorMessage = 'Role is not exist';
            return;
        }

        const token = localStorage.getItem('token');

        const res = await fetch('https://laco-auth.10z.one/users/assignRoleToUser', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: id,
                roleId: selectedRole.value
            })
        });

        if (res.ok) {
            authStore.errorMessage = 'Role assigned successfully';
        } else {
            const errorText = await res.text();
            console.error('Failed to assign role:', errorText);
            authStore.errorMessage = 'Failed to assign role: ' + errorText;
        }

    } catch (error) {
        console.error('Lỗi kết nối:', error);
        authStore.errorMessage = 'Lỗi kết nối';
    }
}


const open = ref(true);

const selectedRole = ref('661c91249e8e16a32504ebf6')

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
</script>