<template>
  <div class="wrapper flex flex-col text-center">
    <div class="title">Pozwolenia wydane dla CPK (liczba: {{ CPKRESULT.length }})</div>
    <div class="title busted mb-10">Wyburzono (liczba: {{ bustedRegistred.length }})</div>
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
      <div>{{ index + 1 }}.</div>
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
        <a class="w-1/2" :href="URL_GEOPORTAL + getParcel(item)" :target="target" rel="noopener noreferrer nofollow">{{
          item.numer_dzialki }}</a>
      </div>
      <div class="hidden md:flex justify-between">
        <a class="w-1/2" :href="URL_GEOPORTAL + getParcel(item)" :target="target"
          rel="noopener noreferrer nofollow">Geoportal</a>
        <a class="w-1/2 hidden md:block" :href="URL_GEOSYSTEM + getParcel(item)" :target="target"
          rel="noopener noreferrer nofollow">GeoSystem</a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useCpk } from '../composables/cpk.ts'
const { URL_GEOPORTAL, URL_GEOSYSTEM, CPKRESULT, getParcel, BUSTED, sort, target, arrayIntersection } = useCpk('...')
const isBusted = (parcelId) => BUSTED.some(parcel => parcel === getParcel(parcelId));
const listOfParcelsFromResults = CPKRESULT.map((x) => getParcel(x))
const bustedRegistred = arrayIntersection(listOfParcelsFromResults, BUSTED)

</script>

<style scoped>
@import url(../styles/main.css);

@media screen and (min-width: 768px) {
  .wrapper .row {
    grid-template-columns: 20px 100px 100px 1fr 150px 150px 250px;
  }
}

</style>