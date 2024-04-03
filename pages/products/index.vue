<template>
  <h2 class="mb-5">products page</h2>
  <div class="grid grid-cols-4 gap-5">
    <div v-for="p in products" :key="p.id">
      <ProductCard :product="p" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});

//fetch the products
const { data: products } = await useFetch('https://fakestoreapi.com/products')


</script>
