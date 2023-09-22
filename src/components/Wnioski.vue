<template>
  <div class="wrapper flex flex-col text-center mt-20">
    <div class="title">Wnioski dla CPK (liczba: {{ WNIOSKI.length }})</div>
    <div class="wrapper my-5">
      <div class="row-rest">
        <div class="index">L.p.</div>
        <div>Działka</div>
        <div>Mapa</div>
      </div>
      <div v-for="(item, index) in WNIOSKI" class="row-rest"
        :class="{ considered: wydanoDlaWniosku(item), pozostale: pozostaleDlaWniosku(item) }">
        <div class="index">{{ index + 1 }}.</div>
        <div class="item">{{ item }}</div>
        <div class="item">{{ getObrebName(item)}}</div>
        <div class="md:hidden">
          <a :href="URL_GEOPORTAL + item" :target="target" rel="noopener noreferrer nofollow">{{ item }}</a>
        </div>
        <div class="hidden md:flex">
          <a :href="URL_GEOPORTAL + item" :target="target" rel="noopener noreferrer nofollow">Geoportal</a>
        </div>
        <div class="hidden md:flex">
          <a :href="URL_GEOSYSTEM + item" :target="target" rel="noopener noreferrer nofollow">GeoSystem</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCpk } from '../composables/cpk.ts'
const { URL_GEOPORTAL, URL_GEOSYSTEM, target, getObrebName, WNIOSKI, wydanoDlaWniosku, pozostaleDlaWniosku } = useCpk()

</script>

<style scoped>
@import url(../styles/main.css);
</style>