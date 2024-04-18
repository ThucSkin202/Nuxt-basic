<template>
    <div class="p-7">
        <Admin-RoleHeader />
        <div class="border-b border-gray-200 pb-5 sm:pb-0">
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

        <div class="mt-10">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name <label
                    class="text-red-600">*</label></label>
            <div class="mt-2 mb-6">
                <input type="name" name="name" id="name" v-model="name"
                    class="block w-full sm:w-7/12 rounded-md border-0 py-1.5 text-gray-900 pl-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" />
            </div>
            <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description <label
                    class="text-red-600">*</label></label>
            <div class="mt-2">
                <input type="description" name="description" id="description" v-model="description"
                    class="block w-full sm:w-7/12 rounded-md border-0 py-1.5 text-gray-900 pl-5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" />
            </div>
            <div class="text-red-500 text-left ml-20 mt-5">{{ errMsg }}</div>
            <button type="button" @click="updateRole"
                class="rounded-md bg-indigo-600 mt-6 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>

    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const authStore = useAuthStore();
const { id } = useRoute().params;

const roleDetails = ref([]);
const errMsg = ref();
const name = ref();
const description = ref();

const fetchRoleDetail = async (roleId) => {
    try {
        await authStore.getRoleById(roleId);

        if (authStore.roleDetails) {
            roleDetails.value = authStore.roleDetails;
            name.value = authStore.roleDetails.name;
            description.value = authStore.roleDetails.description;
        } else {
            errMsg.value = "Authorization";
        }
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu vai trò:', error);
    }
}
fetchRoleDetail(id);

const updateRole = async () => {
    try {
        const token = localStorage.getItem("token");

        const res = await fetch(`https://laco-auth.10z.one/roles/${id}`, {
            method: "PATCH",
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                description: description.value,
                permissions: [
                    {
                        "feature": "user",
                        "actions": [
                            "read",
                            "create",
                            "update",
                            "delete"
                        ],
                        "description": "roles user",
                        "_id": "661bf3169e8e16a32504e92c"
                    }
                ]
            })
        });

        if (res.ok) {
            errMsg.value = 'Updated role successfully';
            fetchRoleDetail(id);
        } else {
            const msg = await res.json()
            errMsg.value = 'Faid to update role: ' + msg.message[0];
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
        errMsg.value = 'Lỗi kết nối';
    }
}



const tabs = [
    { name: 'Settings', href: `/admin/roles/${id}`, current: true },
    { name: 'Permissions', href: `/admin/roles/${id}/permissions`, current: false },
    { name: 'Users', href: `/admin/roles/${id}/users`, current: false },
];

const router = useRouter();

const handleSelectChange = (selectedTab) => {
    const tab = tabs.find(tab => tab.name === selectedTab);
    if (tab && tab.href) {
        router.push(tab.href);
    }
};

</script>
