<template>
  <div>
    <h1 class="font-bold">About</h1>
    <p>Couter: {{ counter }}</p>
    <button class="btn mr-2" @click="counter++">+</button>
    <button class="btn" @click="counter--">-</button>
  </div>
</template>

<script setup>
const counter = useCounter();
</script>