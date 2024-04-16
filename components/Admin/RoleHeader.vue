<template>
    <div class="mb-7">
        <div class="text-gray-500 text-base font-medium">
            <NuxtLink to="/admin/roles">
                <Icon class="text-xl" name="material-symbols-light:keyboard-backspace-rounded" /> Back to Roles
            </NuxtLink>
        </div>
        <h1 class="font-bold text-3xl py-3">{{ nameRoleRef }}</h1>
        <div class="text-gray-700">Role ID: <lable class="rounded-md bg-gray-200 p-1.5 text-xs">{{ roleIdRef }}
            </lable>
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
const nameRoleRef = id === 'Admin' ? "Admin" : "Manager";
</script>