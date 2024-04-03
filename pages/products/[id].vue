<template>
  <div>

    <head>
      <title>Nuxt Dojo | {{ product.title }}</title>
      <meta name="description" :content="product.description" />
    </head>

    <ProductDetailts :product="product" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "products",
});

const { id } = useRoute().params
const uri = `https://fakestoreapi.com/products/${id}`

// Fetch the product
const { data: product } = useFetch(uri)

if (!product.value) {
  throw createError({
    status: 404, statusMessage: "Product not found", fatal: true
  })
}
</script>

<style scoped>
.thumb {
  max-height: 120px;
  max-width: 70%;
}
</style>
