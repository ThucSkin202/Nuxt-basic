<template>
    <Admin-UserDetailHeader />
    <div class="p-5">
        <div class="border-b border-gray-200 pb-5 sm:pb-0 mb-5 ">
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
        <!-- content -->
        <div class="flex justify-between items-center px-5">
            <p>List of permissions this user has.</p>
            <button @click="handleOpenModal" type="button"
                class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Assign
                Permissions</button>
            <!-- Hiển thị modal -->
            <Admin-UserRoleModal :closeModal="closeModal" v-if="isModalOpen" @close="closeModal" />
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
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">API
                                </th>
                                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                    Assignment
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr v-for="per in user_permissions" :key="per.name">
                                <td
                                    class="border-b-2 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-5">
                                    <div class="inline-block bg-gray-200 rounded-md p-1.5">{{ per.name }}</div>
                                </td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.description }}</td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.api }}</td>
                                <td class="border-b-2 whitespace-nowrap px-3 py-4 text-sm">{{ per.assignment }}</td>
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
    layout: "admin",
});

const { id } = useRoute().params

const tabs = [
    { name: 'Detailts', href: `/admin/users/${id}`, current: false },
    { name: 'Devices', href: `/admin/users/${id}/devices`, current: false },
    { name: 'History', href: `/admin/users/${id}/history`, current: false },
    { name: 'Raw JSON', href: `/admin/users/${id}/users`, current: false },
    { name: 'Authenrized Applications', href: `/admin/users/${id}/auth`, current: false },
    { name: 'Permissions', href: `/admin/users/${id}/permissions`, current: false },
    { name: 'Roles', href: `/admin/users/${id}/roles`, current: true },
];

const router = useRouter();

const handleSelectChange = (selectedTab) => {
    const tab = tabs.find(tab => tab.name === selectedTab);
    if (tab && tab.href) {
        router.push(tab.href);
    }
};

const user_permissions = [
    { name: 'create:locations', description: 'Tạo mới địa điểm', api: 'API Merchants', assignment: 'Direct' },
    { name: 'read:drivers', description: 'Read drivers', api: 'API Admin', assignment: '1 Role' },
    { name: 'read:locations', description: 'Read locations', api: 'API Merchants', assignment: '1 Role' },
];

const isModalOpen = ref(false);

const user_detail_api = ref([])

// onMounted(async () => {
//     try {
//         const response = await fetch(`https://laco-auth.10z.one/users/${id}`)
//         if (!response.ok) {
//             throw new Error('Không thể lấy dữ liệu người dùng')
//         }
//         const data = await response.json()
//         user_detail_api.value = data.data
//     } catch (error) {
//         console.error('Lỗi khi lấy dữ liệu người dùng:', error)
//     }
// })

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const handleOpenModal = () => {
    openModal();
};
</script>
