<template>
    <div>
        <header class="shadow-sm bg-white  text-cyan-600">
            <nav class="container mx-auto p-4 flex justify-between">
                <nuxt-link to="/admin/roles" class="font-bold">Admin Dashboard</nuxt-link>
                <ul class="flex gap-4">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><nuxt-link to="/admin/roles">Roles</nuxt-link></li>
                    <li><nuxt-link to="/admin/permissions">Permissions</nuxt-link></li>
                    <li><nuxt-link to="/admin/users">Users</nuxt-link></li>
                </ul>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style scoped></style>