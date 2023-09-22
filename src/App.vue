<script setup>
import Registred from './components/Registred.vue'
import NotListed from './components/NotListed.vue'
import Wnioski from './components/Wnioski.vue'
</script>

<template>
  <div class="my-20">
    <Registred />
    <NotListed />
    <Wnioski />
    <div class="description mt-10">
      Lista zawiera pozwolenia dostępne na https://wyszukiwarka.gunb.gov.pl/pobranie.html
    </div>
    <div class="description mt-10">
      Aktualizacja: 23.09.2023
    </div>
  </div>
</template>