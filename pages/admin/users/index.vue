<template>
    <div class="m-3 sm:m-5">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <p class="mt-2 text-2xl font-bold">Users</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">+
                    Create User</button>
            </div>
        </div>
        <p class="mt-5">An easy to use UI to help administrators manager user identities including password resets,
            create and provisioning, blocking and deleting users.</p>
        <button class="ml-2 mb-10 text-blue-700">Show more ></button>

        <div class="grid grid-cols-12 gap-7">
            <div class="col-span-8">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <Icon name="ic:baseline-search" />
                    </span>
                    <input type="email" name="email" id="email"
                        class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Search for users" />
                </div>
            </div>
            <div class="col-span-3">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
                        Search by: User
                    </span>
                    <input type="email" name="email" id="email"
                        class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div class="col-span-1 flex items-end">
                <button type="button"
                    class="rounded h-9 bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">X
                    Reset</button>
            </div>
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
                                    Connection
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Logins
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Lasted Login
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="user in users" :key="user.email">
                                <td class="border-b-2 whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-11 w-11 flex-shrink-0 sm:ml-5">
                                            <img class="h-11 w-11 rounded-full" :src="user.image" alt="" />
                                        </div>
                                        <div class="ml-4">
                                            <NuxtLink to="#" class="mt-1 text-blue-500 font-medium">{{ user.email }}
                                            </NuxtLink>
                                            <div class="font-medium text-gray-900">{{ user.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="pl-4 border-b-2">{{ user.connection }}</td>
                                <td class="pl-4 border-b-2">{{ user.logins }}</td>
                                <td class="pl-4 border-b-2">{{ user.lasted_login }}</td>
                                <td
                                    class="relative whitespace-nowrap py-4 text-sm font-medium sm:pr-0 border-b-2 rounded-s-lg">
                                    <Menu as="div" class="relative inline-block text-left">
                                        <div>
                                            <MenuButton class=" border-2 p-2 rounded-md text-sm font-bold">
                                                . . .
                                                <ChevronDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </MenuButton>
                                        </div>
                                        <Admin-UserDropdown :username="user.name" />
                                    </Menu>
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

const users = [
    {
        email: 'thucskin@gmail.com',
        name: 'thucskin@gmail.com',
        connection: 'Username-Password-Authentication',
        logins: '22',
        lasted_login: '7 days ago',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        email: 'lindsay@gmail.com',
        name: 'lindsay@gmail.com',
        connection: 'google-oauth2',
        logins: '10',
        lasted_login: '12 days ago',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        email: 'lindsay@gmail.com',
        name: 'lindsay@gmail.com',
        connection: 'Username-Password-Authentication',
        logins: '22',
        lasted_login: '7 days ago',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
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

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
</script>