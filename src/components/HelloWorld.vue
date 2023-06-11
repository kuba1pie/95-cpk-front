<template>
  <ul>
    <li v-for="item in data" :key="item.numer_urzad">
      {{ item.data_wplywu_wniosku.split(' ')[0] }}
      {{ item.data_wydania_decyzji.split(' ')[0] }}
      {{ item.miasto }}
      {{ item.ulica }}
      {{ item.nr_domu }}
      <a
        :href="'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel=' + item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' + item.numer_dzialki">{{
          item.numer_dzialki }}</a> 
      <a
        :href="'https://polska.e-mapa.net/?identifyParcel=' + item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' + item.numer_dzialki">GeoSystem</a>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])

import data from '../cpkResult.json'

function getObrebr(numer) {
  return numer.toString().padStart(4, "0")
}

onMounted(async () => {

  // const response = await fetch('https://dummyjson.com/products')
  // items.value = await response.json()
})
</script>