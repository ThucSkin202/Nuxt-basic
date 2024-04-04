<template>
    <div class="mt-7">
        <!-- Tab navigation -->
        <div class="border-b border-gray-200 pb-5 sm:pb-0 mb-4">
            <div class="mt-3 sm:mt-4">
                <div class="sm:hidden">
                    <label for="current-tab" class="sr-only">Select a tab</label>
                    <select id="current-tab" name="current-tab"
                        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        @change="handleSelectChange($event.target.value)">
                        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">{{ tab.name }}</option>
                    </select>
                </div>
                <div class="hidden sm:block">
                    <nav class="-mb-px flex space-x-8">
                        <router-link v-for="tab in tabs" :key="tab.name" :to="tab.href"
                            :class="[tab.current ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium']"
                            :aria-current="tab.current ? 'page' : undefined">{{ tab.name }}</router-link>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
                <p class="mt-2 text-sm text-gray-700">Add Permissions to this Role. Users who have this Role will
                    receive all Permissions below that match the API of their login request.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button @click="handleOpenModal" type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                    Permissions</button>
            </div>
        </div>
        <!-- Hiển thị modal -->
        <Admin-PermissionModal :closeModal="closeModal" v-if="isModalOpen" @close="closeModal" />

        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-5">
                                    Permissions
                                    <Icon name="ep:arrow-up" />
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Description
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">API
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="(per, index) in permissions" :key="index">
                                <td
                                    class="border-b-2 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-5">
                                    <div class="inline-block bg-gray-200 rounded-md p-1.5">{{ per.name }}</div>
                                </td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.title }}</td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.api }}</td>
                                <td class="border-b-2">
                                    <router-link :to="'/admin/permissions/' + per.id"
                                        class="flex items-center justify-center">
                                        <div class="text-center border-2 rounded-md p-1.5 hover:text-indigo-900">
                                            <Icon name="ic:baseline-delete-outline" />
                                        </div>
                                    </router-link>
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
    layout: "admin-roles",
});

const router = useRouter();

const handleSelectChange = (selectedTab) => {
    const tab = tabs.find(tab => tab.name === selectedTab);
    if (tab && tab.href) {
        router.push(tab.href);
    }
};

const { id } = useRoute().params

const tabs = [
    { name: 'Settings', href: `/admin/roles/${id}`, current: false },
    { name: 'Permissions', href: `/admin/roles/${id}/permissions`, current: true },
    { name: 'Users', href: `/admin/roles/${id}/users`, current: false },
];

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleOpenModal = () => {
    openModal();
};

const permissions = [
    { id: 1, name: 'read : drivers', title: 'Read Drivers', api: 'API Admin' },
    { id: 2, name: 'read : locations', title: 'Read Locations', api: 'API Merchants' },
];

</script>