<template>
  <v-app>
    <TheHeader />
    <TheManagers />
  </v-app>
</template>

<script setup>
import TheHeader from './components/TheHeader.vue'
import TheManagers from './components/TheManagers.vue'
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
