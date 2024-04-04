<template>
    <div class="p-7">
        <div class="mb-7">
            <div class="text-gray-500 text-base font-medium">
                <NuxtLink to="/admin/users">
                    <Icon class="text-xl" name="material-symbols-light:keyboard-backspace-rounded" /> Back to Users
                </NuxtLink>
            </div>
            <div v-for="u in user" :key="u.email" class="flex items-center justify-between">
                <div class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                    <div class="flex items-center">
                        <div class="h-11 w-11 sm:ml-5">
                            <img class=" rounded-full" :src="u.image" alt="" />
                        </div>
                        <div class="ml-4">
                            <NuxtLink to="#" class="font-semibold text-2xl">{{ u.email }}
                            </NuxtLink>
                            <div class="font-medium text-gray-900 mt-2">user_id: <label
                                    class="rounded-md bg-gray-200 p-1.5 text-xs">{{ u.id }}</label></div>
                        </div>
                    </div>
                </div>
                <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <button type="button"
                        class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Actions</button>
                </div>
            </div>
        </div>
        <slot />

    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

const user = [
    {
        email: 'lindsay@email.com',
        id: 'rol_l2xy34fhd',
        image:
            'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
]

</script>