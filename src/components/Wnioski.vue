<template>
  <div class="wrapper flex flex-col text-center mt-20">
    <div class="title">Wnioski złożone (liczba: {{ WNIOSKI.length }})</div>
    <div class="title">Oczekujące wnioski dla CPK (liczba: {{ wnioskiNierozpatrzone.length }})</div>
    <div class="title busted">Rozbiórki rozpoczęte bez rozpatrzenia (liczba: {{ wyburzoneWniosekNierozpatrzony.length }})</div>
    <div class="form my-5"><label for="hideConsidered">Ukryj wydane</label><input type="checkbox" v-model="hideConsidered"
        id="hideConsidered"></div>
    <div class="wrapper my-5" :class="{ hideConsidered: hideConsidered }">
      <div class="row-rest">
        <div class="index">L.p.</div>
        <div>Działka</div>
        <div>Mapa</div>
      </div>
      <div v-for="(item, index) in WNIOSKI" class="row-rest"
        :class="{ considered: wydanoDlaWniosku(item), pozostale: pozostaleDlaWniosku(item), busted: wyburzoneBezRozpatrzenia(item) }">
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

  <div v-if="duplicatedNotListedFromWnioski.length">
    Pozostałe dla których były złożone wnioski:
    <ul>
      <li v-for="ddd in duplicatedNotListedFromWnioski" :key="ddd"> {{ ddd }}</li>
    </ul>
  </div>
  <div v-if="wyburzoneBezWnioskiMINUSwyburzoneWniosekNierpatrzony.length">
    Wyburzone bez wniosku:
    <ul>
      <li v-for="ddd in wyburzoneBezWnioskiMINUSwyburzoneWniosekNierpatrzony" :key="ddd"> {{ ddd }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCpk } from '../composables/cpk.ts'

const { URL_GEOPORTAL, URL_GEOSYSTEM, target, getObrebName, arrayDiv, getParcel, BUSTED, CPKRESULT, WNIOSKI, NOTLISTED, wydanoDlaWniosku, pozostaleDlaWniosku, arrayIntersection } = useCpk()

const duplicatedNotListedFromWnioski = arrayIntersection(NOTLISTED, WNIOSKI)
const listOfParcelsFromResults = CPKRESULT.map((x) => getParcel(x))
const wnioskiNierozpatrzone = arrayDiv(WNIOSKI, listOfParcelsFromResults)
const onBustedButNotRegistred = arrayDiv(BUSTED, listOfParcelsFromResults)
const wyburzoneWniosekNierozpatrzony = arrayIntersection(BUSTED, wnioskiNierozpatrzone)
const wyburzoneBezWnioskiMINUSwyburzoneWniosekNierpatrzony = arrayDiv(onBustedButNotRegistred, wnioskiNierozpatrzone)
const wyburzoneBezRozpatrzenia = (dzialka) => BUSTED.find(i => i === dzialka)

const hideConsidered = ref(true)

</script>

<style scoped>
@import url(../styles/main.css);
</style>