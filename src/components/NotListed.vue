<template>
  <div class="wrapper flex flex-col text-center">
    <div class="wrapper mt-10">
      <div class="title mb-10">Wyburzono bez pozwoleń/wniosków (liczba: {{ NOTLISTED.length }})</div>
      <div class="row-rest">
        <div class="index">L.p.</div>
        <div>Działka</div>
        <div>Mapa</div>
      </div>
      <div v-for="(item, index) in NOTLISTED" class="busted row-rest">
        <div class="index">{{ index + 1 }}.</div>
        <div class="item">{{ item }}</div>
        <div class="item obrebName">{{ getObrebName(item) }}</div>

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
const { URL_GEOPORTAL, URL_GEOSYSTEM, NOTLISTED, getObrebName, target } = useCpk()
</script>

<style scoped>
@import url(../styles/main.css);
</style>