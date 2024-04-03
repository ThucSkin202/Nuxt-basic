<template>
    <div class="m-3 sm:m-5">
        <p class="text-xl font-medium">Add a Permission</p>
        <p class="mb-5">Define the permission (scopes) that this API uses.</p>

        <div class="grid grid-cols-12 gap-7">
            <div class="col-span-5">
                <label for="permission" class="block text-sm font-medium leading-6 text-gray-900">Permission
                    <label class="text-red-600">*</label></label>
                <div class="mt-2">
                    <input type="text" name="permission" id="permission"
                        class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2  sm:text-sm sm:leading-6"
                        placeholder="read:appointments" />
                </div>
            </div>
            <div class="col-span-5">
                <label for="email2" class="block text-sm font-medium leading-6 text-gray-900">Description <label
                        class="text-red-600">*</label></label>
                <div class="mt-2">
                    <input type="email" name="email2" id="email2"
                        class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        placeholder="Read your appointments" />
                </div>
            </div>
            <div class="col-span-2 flex items-end">
                <button type="button"
                    class="rounded h-10 bg-white px-4 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">+
                    Add</button>
            </div>
        </div>

        <p class="text-xl font-medium mt-3 sm:mt-10">List of Permissions</p>
        <p class="mb-5">These are all the permissions that this API uses.</p>

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-5">
                                    Permission
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="per in Permissions" :key="per.name">
                                <td
                                    class="border-b-2 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-5">
                                    <div class="inline-block bg-gray-200 rounded-md p-1.5">{{ per.name }}</div>
                                </td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.title }}</td>
                                <td class="border-b-2">
                                    <NuxtLink href="#" class="flex items-center justify-center">
                                        <div class="text-center border-2 rounded-md p-1.5 hover:text-indigo-900">
                                            <Icon name="ic:baseline-delete-outline" />
                                        </div>
                                    </NuxtLink>
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

const Permissions = [
    { name: 'read : locations', title: 'Read locations' },
    { name: 'create : locations', title: 'Add location' },
]

</script>