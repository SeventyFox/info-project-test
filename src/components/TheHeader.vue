<script setup></script>

<template>
  <div class="header">
    <v-icon class="icon" icon="mdi-text"></v-icon>
    <h4>Управление компанией</h4>
    <v-icon class="icon" icon="mdi-bell"></v-icon>
    <v-icon class="icon" icon="mdi-cart"></v-icon>
  </div>

  <v-btn :to="{ name: 'companies' }">мои компании</v-btn>
  <v-btn :to="{ name: 'managers' }">мои менеджеры</v-btn>
</template>

<style lang="scss">
.header {
  display: flex;
}
.icon {
  color: $icon;
}
</style>
