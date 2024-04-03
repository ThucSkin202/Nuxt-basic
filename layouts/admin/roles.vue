<template>
    <div class="p-7">
        <div class="mb-7">
            <div class="text-gray-500 text-base font-medium">
                <NuxtLink to="/admin/roles">
                    <Icon class="text-xl" name="material-symbols-light:keyboard-backspace-rounded" /> Back to Roles
                </NuxtLink>
            </div>
            <h1 class="font-bold text-3xl py-3">Admin</h1>
            <div class="text-gray-700">Role ID <lable class="rounded-md bg-gray-200 p-1.5 text-xs">rol_l2xy34fhd
                </lable>
            </div>
        </div>
        <slot />

    </div>
</template>

<script setup>
definePageMeta({
    layout: "admin",
});

</script>