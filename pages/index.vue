<template>
  <div>
    <h1>Trang chủ</h1>
  </div>
</template>

<script setup>


definePageMeta({
  middleware: 'is-logged-out'
})

</script>
