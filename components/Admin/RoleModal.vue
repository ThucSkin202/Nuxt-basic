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
                                <button type="button"
                                    class="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-500"
                                    @click="closeModal" @close="closeModal">
                                    <span class="text-xl">x</span>
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900">
                                        New Role
                                    </DialogTitle>
                                </div>
                            </div>
                            <div class="mt-5">
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name
                                    <label class="text-red-500">*</label></label>
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <input type="text" name="name" id="name" v-model="name"
                                        class="block w-full rounded-md border-0 pl-3 py-1.5 pr-10 text-back-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        aria-invalid="true" aria-describedby="name-error" />
                                </div>
                            </div>
                            <div class="mt-5">
                                <label for="description"
                                    class="block text-sm font-medium leading-6 text-gray-900">Description
                                    <label class="text-red-500">*</label></label>
                                <div class="relative mt-2 rounded-md shadow-sm">
                                    <input type="text" name="description" id="description" v-model="description"
                                        class="block w-full rounded-md border-0 pl-3 py-1.5 pr-10 text-back-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                        aria-invalid=" true" aria-describedby="name-error" />
                                </div>
                            </div>
                            <div class="text-center text-red-500 my-5">{{ errMsg }}</div>
                            <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    @click="createNewRole">
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

const name = ref('');
const description = ref('');
const errMsg = ref();

const createNewRole = async () => {
    try {
        if (!name.value || !description.value) {
            errMsg.value = 'Please enter both name and description!';
            return;
        }

        await authStore.createRoles(name.value, description.value);

        name.value = '';
        description.value = '';
        errMsg.value = authStore.errorMessage;
    } catch (error) {
        console.error('Error creating new role:', error);
        errMsg.value = 'An error occurred while creating the role.';
    }
}


import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)
const props = defineProps(['closeModal'])
const { closeModal } = props;
</script>