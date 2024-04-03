<template>
    <div>
        <header class="shadow-sm bg-white  text-cyan-600">
            <nav class="container mx-auto p-4 flex justify-between">
                <nuxt-link to="/" class="font-bold">Nuxt Layout</nuxt-link>
                <ul class="flex gap-4">
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><nuxt-link to="/abouts">About</nuxt-link></li>
                    <li><nuxt-link to="/products">Product</nuxt-link></li>
                    <li><nuxt-link to="#">Help</nuxt-link></li>
                </ul>
            </nav>
        </header>
        <slot />
    </div>
</template>

<style scoped></style>