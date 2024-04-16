<template>
    <div class="p-7">
        <Admin-RoleHeader />
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
                <p class="mt-2 text-sm text-gray-700">Users that have this role directly assigned.</p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button type="button"
                    class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add
                    user</button>
            </div>
        </div>
        <div class="mt-8 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col"
                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-5">User
                                </th>
                                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <tr v-for="user in userData" :key="user._id">
                                <td class="border-b-2 whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                    <div class="flex items-center">
                                        <div class="h-14 w-14 sm:ml-5 rounded-full overflow-hidden">
                                            <img class="h-full w-full object-cover"
                                                src="https://cdnphoto.dantri.com.vn/Im0W2Oa59BulrmFjQo1dOsDcBZY=/thumb_w/990/2021/10/30/trang-nhungdocx-1635528230350.jpeg"
                                                alt="Description of the image" />
                                        </div>
                                        <div class="ml-4">
                                            <NuxtLink to="#" class="mt-1 text-blue-500 font-medium">{{ user._id }}
                                            </NuxtLink>
                                            <div class="font-medium text-gray-900">{{ user.username }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="border-b-2">
                                    <NuxtLink href="#" class="flex items-end justify-center">
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

const { id } = useRoute().params;

const roleIdAdmin = ref("661c91249e8e16a32504ebf6");
const roleIdManager = ref("6615215d7e6b08ed157785f0");
const roleIdRef = id === 'Admin' ? roleIdAdmin : roleIdManager;

const userData = ref([]);
const errMsg = ref();

const getRoleById = async () => {
    try {
        if (!roleIdRef.value) {
            console.log('roleId is required');
            return;
        }

        const token = localStorage.getItem('token');

        const res = await fetch(`https://laco-auth.10z.one/roles/${roleIdRef.value}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
        });

        if (res.ok) {
            const data = await res.json();
            userData.value = data.data.users;
        } else {
            errMsg.value = 'Unauthorized';
            const errorText = await res.text();
            console.error('Failed to fetch role:', errorText);
        }
    } catch (error) {
        console.error('Lỗi kết nối:', error);
    }
}

getRoleById()



const tabs = [
    { name: 'Settings', href: `/admin/roles/${id}`, current: false },
    { name: 'Permissions', href: `/admin/roles/${id}/permissions`, current: false },
    { name: 'Users', href: `/admin/roles/${id}/users`, current: true },
];

const router = useRouter();

const handleSelectChange = (selectedTab) => {
    const tab = tabs.find(tab => tab.name === selectedTab);
    if (tab && tab.href) {
        router.push(tab.href);
    }
};

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

const users = [
    {
        email: 'lindsay@email.com',
        name: 'lindsay@email.com',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        email: 'lindsay@email.com',
        name: 'lindsay@email.com',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        email: 'lindsay@email.com',
        name: 'lindsay@email.com',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    // More people...
]
</script>
