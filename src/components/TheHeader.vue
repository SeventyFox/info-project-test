<script setup></script>

<template>
  <div class="header">
    <v-icon class="header__icon header__burger" icon="mdi-text"></v-icon>
    <h4 class="header__title">Управление компанией</h4>
    <v-icon class="header__icon header__notification" icon="mdi-bell"></v-icon>
    <v-icon class="header__icon header__cart" icon="mdi-cart"></v-icon>
  </div>
  <v-tabs v-model="tab">
    <v-tab value="one">мои компании</v-tab>
    <v-tab value="two">мои менеджеры</v-tab>
  </v-tabs>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 10px 15px;
  justify-content: space-between;
  &__icon {
    color: #717475;
  }
  &__burger {
    margin-right: 52px;
  }
  &__title {
    width: 175px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__notification {
    margin-left: 12px;
  }
  &__cart {
    margin-left: 22px;
  }
  &__button-group {
    display: flex;
    justify-content: center;
    margin: 10px 16px 15px 16px;
  }
}
:deep(.v-slide-group__content) {
  justify-content: center;
}
:deep(.v-btn__content) {
  letter-spacing: 2px;
}
</style>
