<template>
  <div class="wrapper flex flex-col text-center">
    <div class="title mb-10">Pozwolenia wydane dla CPK (liczba: {{ data.length }} )</div>
    <div class="row">
      <div class="index">L.p.</div>
      <div class="hidden md:block">Data wpływu</div>
      <div>Data wydania</div>
      <div>Adres</div>
      <div class="hidden md:block">Nr pozwolenia</div>
      <div class="hidden md:block">Działka</div>
      <div>Mapa</div>
    </div>
    <div v-for="(item, index) in sort()" :key="item.numer_urzad" class="row" :class="{ busted: isBusted(item) }">
      <div>{{ index + 1 }}</div>
      <div class="hidden md:block">{{ item.data_wplywu_wniosku.split(' ')[0] }} </div>
      <div>{{ item.data_wydania_decyzji.split(' ')[0] }}</div>
      <div>
        {{ item.miasto }}
        {{ item.ulica }}
        {{ item.nr_domu }}
      </div>
      <div class="hidden md:block">{{ item.numer_decyzji_urzedu }}</div>
      <div class="hidden md:block">{{ getParcel(item) }}</div>
      <div class="md:hidden">
        <a class="w-1/2" :href="geoportalUrl + getParcel(item)" :target="target" rel="noopener noreferrer nofollow">{{
          item.numer_dzialki }}</a>
      </div>
      <div class="hidden md:flex justify-between">
        <a class="w-1/2" :href="geoportalUrl + getParcel(item)" :target="target"
          rel="noopener noreferrer nofollow">Geoportal</a>
        <a class="w-1/2 hidden md:block" :href="geosystemUrl + getParcel(item)" :target="target"
          rel="noopener noreferrer nofollow">GeoSystem</a>
      </div>
    </div>
    <div class="wrapper mt-10">
      <div class="title mb-10">Pozostałe wyburzenia</div>
      <div class="row">
        <div class="index">L.p.</div>
        <div>Mapa</div>
      </div>
      <div v-for="(item, index) in notListed" class="busted flex justify-between">
        <div class="index">{{ index+1 }}</div>
        <div class="item">{{ item }}</div>
        <div class="justify-between">
          <a :href="geoportalUrl + item" :target="target" rel="noopener noreferrer nofollow">Geoportal</a>
          <a :href="geosystemUrl + item" :target="target" rel="noopener noreferrer nofollow">GeoSystem</a>
        </div>
      </div>
    </div>
    <div class="description mt-10">
      Lista zawiera pozwolenia dostępne na https://wyszukiwarka.gunb.gov.pl/pobranie.html
    </div>
    <div class="description mt-10">
      Aktualizacja: 20.06.2023
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

let targetBlank = ref(true)

import data from '../assets/cpkResult.json'
import busted from '../assets/busted.json'
import notListed from '../assets/notListed.json'

const geoportalUrl = 'https://mapy.geoportal.gov.pl/imap/Imgp_2.html?identifyParcel='
const geosystemUrl = 'https://polska.e-mapa.net/?identifyParcel='

const target = () => targetBlank.valueOf ? '_blank' : '_self'

const getObreb = (numer) => numer.toString().padStart(4, "0");
const getParcel = (item) => item.jednosta_numer_ew + '.' + getObreb(item.obreb_numer) + '.' + item.numer_dzialki;

const isBusted = (el) => busted.some(e => e === getParcel(el));

function sort() {
  return data.sort(function (a, b) {
    a = a.data_wydania_decyzji.split('-');
    b = b.data_wydania_decyzji.split('-');
    return a[2] - b[2] || a[1] - b[1] || a[0] - b[0];
  });
}

</script>

<style scoped>
.wrapper .row {
  display: grid;
  grid-template-columns: 20px 100px 1fr 100px;
  border-bottom: 1px solid gray;
}

@media screen and (min-width: 768px) {
  .wrapper .row {
    grid-template-columns: 20px 100px 100px 1fr 150px 150px 250px;
  }
}

.busted {
  color: red;
}
</style>