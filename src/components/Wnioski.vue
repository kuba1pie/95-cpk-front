<template>
  <div class="wrapper flex flex-col text-center mt-20">
    <div class="title">Wnioski dla CPK (liczba: {{ WNIOSKI.length }})</div>
    <div class="wrapper my-5">
      <div class="row-rest">
        <div class="index">L.p.</div>
        <div>Działka</div>
        <div>Mapa</div>
      </div>
      <div v-for="(item, index) in WNIOSKI" class="row-rest">
        <div class="index">{{ index + 1 }}.</div>
        <div class="item">{{ item }}</div>
        <div class="item">{{ getObrebName(item) }}</div>
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
const { URL_GEOPORTAL, URL_GEOSYSTEM, target, getObrebName, WNIOSKI } = useCpk()


const getWies = (item) => item.split(".")[1];

const wiskitki = {
  "0001": "ALEKSANDRÓW",
  "0002": "ANTONIEW",
  "0003": "BABSKIE BUDY",
  "0004": "CZERWONA NIWA WIEŚ",
  "0005": "CZERWONA NIWA PARCEL",
  "0006": "DUNINOPOL",
  "0007": "DZIAŁKI",
  "0008": "FELIKSÓW",
  "0009": "FRANCISZKÓW",
  "0010": "GUZÓW",
  "0011": "HIPOLITÓW",
  "0012": "JANÓWEK",
  "0013": "JESIONKA",
  "0014": "JÓZEFÓW",
  "0015": "KAMIONKA",
  "0016": "ŁUBNO",
  "0017": "MIEDNIEWICE",
  "0018": "CYGANKA",
  "0019": "NOWA WIEŚ",
  "0020": "NOWE KOZŁOWICE",
  "0021": "NOWY DRZEWICZ",
  "0022": "NOWY ORYSZEW",
  "0023": "ORYSZEW OSADA",
  "0024": "PODBUSZYCE",
  "0025": "PODORYSZEW",
  "0026": "POPIELARNIA",
  "0027": "PROŚCIENIEC",
  "0028": "RÓŻANÓW",
  "0029": "SMOLARNIA",
  "0030": "SOKULE"
}

</script>

<style scoped>
@import url(../styles/main.css);
</style>