<template>
    <div class="px-4 sm:px-6 lg:px-8 p-4">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <h1 class="text-lg font-semibold leading-6 text-gray-900">Roles</h1>
                <p class="mt-2 text-sm text-gray-500">Create and manage Roles for your applications. Roles contain
                    collections of Permissions and can be assigned to Users.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button @click="handleOpenModal" type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+
                    Create Role</button>
            </div>
        </div>
        <!-- Hiển thị modal -->
        <Admin-RoleModal :closeModal="closeModal" v-if="isModalOpen" @close="closeModal" />
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-5">
                                    Name
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="r in roles" :key="r.name">
                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-400 sm:pl-5 border-b-2">
                                    {{ r.name }}
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm border-b-2">{{ r.description }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 border-b-2 rounded-s-lg">
                                    <NuxtLink :to="'/admin/roles/' + r.name"
                                        class="hover:text-indigo-900 border-2 p-2 text-sm font-bold">. . .<span
                                            class="sr-only"></span></NuxtLink>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const roles = [
    { name: 'Admin', description: 'Quản lý hệ thống' },
    { name: 'Manager', description: 'Quản lý khu vực' },
]

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const handleOpenModal = () => {
    openModal()
}
</script>