<template>
    <div class="m-3 sm:m-5">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <p class="mt-2 text-2xl font-bold">Users</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button" @click="handleOpenModal"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+
                    Create User</button>
                <Admin-UserAddNewModal :closeModal="closeModal" v-if="isModalOpen" @close="closeModal" />
            </div>
        </div>
        <p class="mt-5">An easy to use UI to help administrators manager user identities including password resets,
            create and provisioning, blocking and deleting users.</p>
        <button class="ml-2 mb-10 text-blue-700">Show more ></button>

        <div class="flex gap-7">
            <div class="relative">
                <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Icon name="ic:baseline-search" />
                </span>
                <input type="text" v-model="searchKeyword" placeholder="Search by username"
                    class="block w-[400px] sm:w-[700px] rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                                    Roles
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="user in filteredUsers" :key="user._id">
                                <td class="border-b-2 whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-14 w-14 sm:ml-5 rounded-full overflow-hidden">
                                            <img class="h-full w-full object-cover"
                                                src="https://cdnphoto.dantri.com.vn/Im0W2Oa59BulrmFjQo1dOsDcBZY=/thumb_w/990/2021/10/30/trang-nhungdocx-1635528230350.jpeg"
                                                alt="Description of the image" />
                                        </div>
                                        <div class="ml-4">
                                            <NuxtLink :to="`/admin/users/${user._id}`"
                                                class="mt-1 text-blue-500 font-medium">{{ user._id }}</NuxtLink>
                                            <div class="font-medium text-gray-900">{{ user.username }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="pl-4 border-b-2">{{ user.roles }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 text-sm font-medium sm:pr-0 border-b-2 rounded-s-lg">
                                    <Menu as="div" class="relative inline-block text-left">
                                        <div>
                                            <MenuButton class=" border-2 p-2 rounded-md text-sm font-bold">
                                                . . .
                                            </MenuButton>
                                        </div>
                                        <Admin-UserDropdown :username="user.username" :id="user._id" />
                                    </Menu>
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
                                <span class="font-medium">{{ Math.min(currentPage * pageSize, totalUsers)
                                    }}</span>
                                of
                                <span class="font-medium">{{ totalUsers }}</span>
                                results
                            </p>
                        </div>
                        <div class="flex flex-1 justify-between sm:justify-end">
                            <button @click="fetchPreviousPage" :disabled="currentPage === 1"
                                class="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0">Previous</button>
                            <button @click="fetchNextPage" :disabled="currentPage * pageSize >= totalUsers"
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
    middleware: 'is-logged-out'
});

const authStore = useAuthStore();
const users = ref([]);
const errMsg = ref();

const currentPage = ref(1);
const pageSize = 5;
const totalUsers = ref(0);

const fetchUsers = async (limit, page) => {
    try {
        await authStore.getAllUsers(limit, page);
        const { userData, userTotal } = authStore;
        if (userData && userData.length > 0) {
            users.value = userData;
            errMsg.value = null;
            totalUsers.value = userTotal;
        } else {
            totalUsers.value = 0;
            errMsg.value = 'Unauthorized';
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        errMsg.value = 'Error fetching users';
    }
};

const fetchNextPage = () => {
    if (currentPage.value < totalUsers.value / pageSize) {
        currentPage.value++;
        fetchUsers(pageSize, currentPage.value);
    }
};

const fetchPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        fetchUsers(pageSize, 1);
    }
};

fetchUsers(pageSize, currentPage.value);

// search users
let searchKeyword = ref('');

const filteredUsers = computed(() => {
    return users.value.filter(user => {
        return user.username.toLowerCase().includes(searchKeyword.value.toLowerCase());
    });
});

const resetSearch = () => {
    searchKeyword.value = '';
    fetchUsers(pageSize, currentPage.value);
};

const isModalOpen = ref(false)

const openModal = () => {
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
}

const handleOpenModal = () => {
    openModal();
}

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>