<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

let res = ref({})

async function fetchData() {
  const response = await fetch("https://dummyjson.com/products");
  const jsonData = await response.json();
  res = jsonData
}

fetchData()
</script>

<template>
  <h1>{{ msg }}</h1>
  <li v-for="item in res.products">
    {{ item.title }}
  </li>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
