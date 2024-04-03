<template>
    <div class="mt-7 max-w-sm mx-auto text-center card">
        <p class="mt-7 font-bold text-7xl">{{ error.statusCode }}</p>
        <p class="mt-7 font-bold text-6xl">0oops.</p>
        <p class="mt-7">{{ error.message }}</p>
        <button class="btn my-7" @click="handleClearError">Go home...</button>
    </div>
</template>

<script setup>
defineProps(['error'])

const handleClearError = () => clearError({ redirect: '/' })

</script>

<style scoped></style>