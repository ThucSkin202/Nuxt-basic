<template>
    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-[1200px] mx-auto overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                            <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                <button type="button"
                                    class="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 p-1 text-gray-400 hover:text-gray-500"
                                    @click="closeModal">
                                    <span class="text-xl">x</span>
                                </button>
                            </div>
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-gray-900">
                                        Add Permissions
                                    </DialogTitle>
                                    <div class="mt-2">
                                        <p class="text-sm text-gray-900">
                                            Select permissions from existing APIs
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="my-7">
                                <select id="location" name="location"
                                    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2  sm:text-sm sm:leading-6">
                                    <option selected="">API Merchants</option>
                                    <option>API Admin</option>
                                </select>
                            </div>
                            <div class="sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button
                                    class="mt-3 inline-flex w-full border-none justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="closeModal">
                                    Add Permissions
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
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

const open = ref(true)
const closeModal = () => {
    open.value = false
}
</script>