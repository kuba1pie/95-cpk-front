<template>
  <div class="wrapper flex flex-col text-center">
    <div class="title mb-10">Pozwolenia wydane dla CPK (liczba: {{ data.length }} )</div>
    <div class="row">
      <div class="index">L.p.</div>
      <div class="hidden md:block">Data wpływu</div>
      <div>Data wydania</div>
      <div>Adres</div>
      <div class="hidden md:block">Działka</div>
      <div>Mapa</div>
    </div>
    <div v-for="(item, index) in sort()" :key="item.numer_urzad" class="row">
      <div>{{ index + 1 }}</div>
      <div class="hidden md:block">{{ item.data_wplywu_wniosku.split(' ')[0] }} </div>
      <div>{{ item.data_wydania_decyzji.split(' ')[0] }}</div>
      <div>
        {{ item.miasto }}
        {{ item.ulica }}
        {{ item.nr_domu }}
      </div>
      <div class="hidden md:block">{{ item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' +
        item.numer_dzialki }}</div>
      <div class="md:hidden">
        <a class="w-1/2"
          :href="'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel=' + item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' + item.numer_dzialki">{{
            item.numer_dzialki }}</a>
      </div>
      <div class="hidden md:flex justify-between">
        <a class="w-1/2"
          :href="'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel=' + item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' + item.numer_dzialki">Geoportal</a>
        <a class="w-1/2 hidden md:block"
          :href="'https://polska.e-mapa.net/?identifyParcel=' + item.jednosta_numer_ew + '.' + getObrebr(item.obreb_numer) + '.' + item.numer_dzialki">GeoSystem</a>
      </div>
    </div>
    <div class="description mt-10">
      Lista zawiera jedynie pozwolenia dostępne na https://wyszukiwarka.gunb.gov.pl/pobranie.html
    </div>
    <div class="description mt-10">
      Aktualizacja: 20.06.2023
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const items = ref([])

import data from '../cpkResult.json'

function getObrebr(numer) {
  return numer.toString().padStart(4, "0")
}

function sort() {
  return data.sort(function (a, b) {
    a = a.data_wydania_decyzji.split('-');
    b = b.data_wydania_decyzji.split('-');
    return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
  });
}

onMounted(async () => {

  // const response = await fetch('https://dummyjson.com/products')
  // items.value = await response.json()
})
</script>
<style scoped>
.wrapper .row {
  display: grid;
  grid-template-columns: 20px 100px 1fr 100px;
  border-bottom: 1px solid gray;
}

@media screen and (min-width: 768px) {
  .wrapper .row {
    grid-template-columns: 20px 100px 100px 1fr 200px 250px;
  }
}
</style>