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

        <div class="flex gap-7 mt-7">
            <div class="col-span-8">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Icon name="ic:baseline-search" />
                    </span>
                    <input type="text" v-model="searchKeyword" placeholder="Search by username"
                        class="block w-[400px] sm:w-[700px] rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <button type="button" @click="resetSearch"
                class="rounded h-9 bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">X
                Reset</button>
        </div>

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
                            <tr v-for="role in filteredRoles" :key="role._id">
                                <td
                                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-indigo-400 sm:pl-5 border-b-2">
                                    <nuxt-link :to="'/admin/roles/' + role._id">{{ role.name }}</nuxt-link>
                                </td>
                                <td class="whitespace-nowrap px-3 py-4 text-sm border-b-2">{{ role.description }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 border-b-2 rounded-s-lg">
                                    <NuxtLink :to="'/admin/roles/' + role._id"
                                        class="hover:text-indigo-900 border-2 p-2 text-sm font-bold">. . .<span
                                            class="sr-only"></span></NuxtLink>
                                </td>
                                <td class="border-b-2">
                                    <button @click="handleDelete(role._id)"
                                        class="ml-4 flex items-center justify-center">
                                        <div class="text-center border-2 rounded-md p-1.5 hover:text-indigo-900">
                                            <Icon name="ic:baseline-delete-outline" />
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <nav class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                        aria-label="Pagination">
                        <div class="hidden sm:block">
                            <p class="text-sm text-gray-700">
                                Showing
                                <!-- <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> -->
                                to
                                <span class="font-medium">{{ Math.min(currentPage * pageSize, totalRoles)
                                    }}</span>
                                of
                                <span class="font-medium">{{ totalRoles }}</span>
                                results
                            </p>
                        </div>
                        <div class="flex flex-1 justify-between sm:justify-end">
                            <button @click="fetchPreviousPage" :disabled="currentPage === 1"
                                class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Previous</button>
                            <button @click="fetchNextPage" :disabled="currentPage * pageSize >= totalRoles"
                                class="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Next</button>
                        </div>
                    </nav>
                    <div class="text-center mt-10 text-red-500">{{ errMsg }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "admin",
    middleware: 'is-logged-out',
})

const authStore = useAuthStore();
const errMsg = ref();
const roles = ref([]);

const currentPage = ref(1);
const pageSize = 5;
const totalRoles = ref(0);

const fetchRoles = async (limit, page) => {
    try {
        await authStore.getAllRoles(limit, page);

        const { roleData, roleTotal } = authStore;

        if (roleData && roleData.length > 0) {
            roles.value = roleData;
            errMsg.value = null;
            totalRoles.value = roleTotal;
        } else {
            totalRoles.value = 0;
            errMsg.value = 'Unauthorized';
        }
    } catch (error) {
        console.error('Lỗi khi lấy vai trò người dùng:', error);
        errMsg.value = 'Error fetching roles: ' + error.message;
    }
}

fetchRoles(pageSize, currentPage);

const fetchNextPage = () => {
    if (currentPage.value < totalRoles.value / pageSize) {
        currentPage.value++;
        fetchRoles(pageSize, currentPage.value);
    }
};

const fetchPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchRoles(pageSize, currentPage.value);
    }
};

// search roles
let searchKeyword = ref('');

const filteredRoles = computed(() => {
    return roles.value.filter(role => {
        return role.name.toLowerCase().includes(searchKeyword.value.toLowerCase());
    });
});

const resetSearch = () => {
    searchKeyword.value = '';
    fetchRoles(pageSize, currentPage.value);
};

const handleDelete = async (id) => {
    try {
        if (!id) {
            errMsg.value = 'Id is required';
            return;
        }
        const confirmed = window.confirm(`Do you want to delete this role?`);
        if (confirmed) {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://laco-auth.10z.one/roles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete role');
            }

            // Xóa role khỏi danh sách roles
            const index = roles.value.findIndex(role => role._id === id);
            roles.value.splice(index, 1);

            totalRoles.value--;

            // Nếu không còn roles trên trang hiện tại, quay về trang trước đó
            if (filteredRoles.value.length === 0 && currentPage.value > 1) {
                currentPage.value--;
            }

            fetchRoles(pageSize, currentPage.value);
        }
    } catch (error) {
        errMsg.value = 'Lỗi kết nối: ' + error.message;
    }
}

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