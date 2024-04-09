<template>
    <!-- Tab navigation -->
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

    <div v-for="user in user_detail" :key="user.email" class="grid grid-cols-3 gap-6 border-2 p-7 rounded-md">
        <div>Name <p>{{ user.name }}</p>
            <button class="text-blue-700">Edit</button>
        </div>
        <div>Email <p>{{ user.email }}</p>
            <button class="text-blue-700">Edit</button>
        </div>
        <div>Signed up <p>{{ user.signed_up }}</p>
        </div>
        <div>Primary Identify Provider <p>{{ user.provider }}</p>
        </div>
        <div>Lasted Login <p>{{ user.lasted_login }}</p>
        </div>
        <div>Accounts Associated <p>{{ user.Acc_Associated }}</p>
        </div>
        <div>Browser <p>{{ user.browser }}</p>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    layout: "admin-users",
});

const { id } = useRoute().params

const tabs = [
    { name: 'Detailts', href: `/admin/users/${id}`, current: true },
    { name: 'Devices', href: `/admin/users/${id}/devices`, current: false },
    { name: 'History', href: `/admin/users/${id}/history`, current: false },
    { name: 'Raw JSON', href: `/admin/users/${id}/users`, current: false },
    { name: 'Authenrized Applications', href: `/admin/users/${id}/users`, current: false },
    { name: 'Permissions', href: `/admin/users/${id}/permissions`, current: false },
    { name: 'Roles', href: `/admin/users/${id}/roles`, current: false },
];

const router = useRouter();

const handleSelectChange = (selectedTab) => {
    const tab = tabs.find(tab => tab.name === selectedTab);
    if (tab && tab.href) {
        router.push(tab.href);
    }
};

const user_detail = [
    {
        email: 'lindsay@gmail.com',
        name: 'lindsay@gmail.com',
        signed_up: 'October 5th 2024, 6:34:54 AM',
        provider: 'Database',
        lasted_login: 'March 22nd 2024, 22:34:54 PM',
        Acc_Associated: 'None',
        browser: '-'
    },
]

</script>
