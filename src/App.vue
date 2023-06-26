<template>
  <v-app>
    <TheHeader />
    <router-view />
  </v-app>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
</script>

<style lang="scss">
.v-btn {
  letter-spacing: 0.25px;
}
.manager__add,
.manager__filter {
  width: 132px;
  min-width: 132px;
  height: 32px;
}
</style>
