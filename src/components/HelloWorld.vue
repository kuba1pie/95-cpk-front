<template>
  <ul>
    <li v-for="item in items.products" :key="item.id">{{ item.title }}</li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])

onMounted(async () => {
  const response = await fetch('https://dummyjson.com/products')
  items.value = await response.json()
})
</script>