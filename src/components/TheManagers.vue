<script setup>
import { ref, onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useManagersStore } from '../stores/store.js'
import ManagerModal from './ManagerModal.vue'
import TablePagination from './TablePagination.vue'

const managersStore = useManagersStore()

const isDialogOpen = ref(false)
const dialogData = ref()
const isCreate = ref(false)
const page = ref(1)
const itemsPerPage = ref(5)
const pageCount = ref(1)
const searchString = ref('')

const openEditManager = (manager) => {
  dialogData.value = manager
  isCreate.value = false
  isDialogOpen.value = true
}

const openCreateManager = () => {
  dialogData.value = {}
  isCreate.value = true
  isDialogOpen.value = true
}

const deleteManager = (id) => {
  managersStore.removeManager(id)
}

const onOptionsUpdate = (_options) => {
  const searchStringInLowerCase = searchString.value.toLowerCase()
  const filteredManagers = managersStore.managers.filter((manager) =>
    manager.name.toLowerCase().includes(searchStringInLowerCase)
  )
  pageCount.value = Math.ceil(filteredManagers.length / _options.itemsPerPage)
}

const tableHeaders = [
  {
    title: 'АКТИВЕН',
    key: 'isActive'
  },
  { title: 'ФИО', key: 'name' },
  { key: 'actions', sortable: false }
]

const sortBy = [
  { key: 'isActive', order: 'asc' },
  { key: 'name', order: 'asc' }
]

onMounted(() => {
  managersStore.getManagers()
})
</script>

<template>
  <div>
    <div class="manager__search">
      <v-text-field
        v-model="searchString"
        placeholder="Быстрый поиск"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
      ></v-text-field>
    </div>
    <div class="manager__group">
      <v-btn prepend-icon="mdi-filter-variant" class="rounded-xl text-capitalize" variant="tonal">
        <template v-slot:prepend>
          <v-icon class="manager__icon"></v-icon>
        </template>
        Фильтр
        <template v-slot:append>
          <v-badge color="error" content="1" inline></v-badge>
        </template>
      </v-btn>
      <v-btn
        prepend-icon="mdi-plus"
        class="rounded-xl text-capitalize"
        variant="tonal"
        @click="openCreateManager"
        rounded-xl
      >
        <template v-slot:prepend>
          <v-icon class="manager__icon"></v-icon>
        </template>
        Добавить
      </v-btn>
    </div>
    <v-data-table
      v-model:page="page"
      :headers="tableHeaders"
      :items="managersStore.managers"
      :items-per-page="itemsPerPage"
      item-value="name"
      :search="searchString"
      class="elevation-1"
      @update:options="onOptionsUpdate"
      density="compact"
      width="100"
      :sort-by="sortBy"
      sort-asc-icon="mdi-triangle"
      sort-desc-icon="mdi-triangle-down"
      must-sort
    >
      <template v-slot:top>
        <TablePagination v-model="page" v-model:itemsPerPage="itemsPerPage" :length="pageCount" />
      </template>
      <template v-slot:item.isActive="{ item }">
        <v-switch v-model="item.raw.isActive" inset hide-details density="comfortable"></v-switch
      ></template>
      <template v-slot:item.name="{ item }">
        <div class="font-weight-bold">{{ item.raw.name }}</div>
        <div>Логин: {{ item.raw.login }}</div>
        <div>Почта: {{ item.raw.email }}</div>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          @click="() => openEditManager(item.raw)"
          density="compact"
          icon="mdi-pencil"
          variant="plain"
        >
        </v-btn>
        <v-btn
          @click="() => deleteManager(item.raw?.id)"
          density="compact"
          icon="mdi-delete"
          variant="plain"
        ></v-btn>
      </template>
      <template v-slot:bottom>
        <TablePagination v-model="page" v-model:itemsPerPage="itemsPerPage" :length="pageCount" />
      </template>
    </v-data-table>
    <ManagerModal v-model="isDialogOpen" :manager="dialogData" :is-create="isCreate" />
  </div>
</template>

<style lang="scss">
:deep(.v-btn) {
  letter-spacing: 0.25px !important;
}
.manager {
  &__card {
    display: flex;
    color: #717475;
  }
  &__group {
    display: flex;
    justify-content: space-between;
    margin: 0 16px;
  }
  &__icon {
    color: #717475;
  }
  &__search {
    margin: 15px 16px;
  }
}
.v-data-table .v-table__wrapper > table > thead > tr th {
  background-color: #dde2e5;
}
.v-data-table-header__sort-icon {
  font-size: 14px;
  margin-left: 10px;
}
.v-table > .v-table__wrapper > table > thead > tr > th:nth-child(2) {
  padding-left: 0px;
}
.v-table > .v-table__wrapper > table > tbody > tr > td {
  padding-right: 0;
}
.v-table > .v-table__wrapper > table > tbody > tr > td:nth-child(2) {
  padding-left: 0;
  padding-top: 10px;
  padding-bottom: 10px;
}
.v-table > .v-table__wrapper > table > tbody > tr > td:nth-child(3) {
  padding-left: 0;
}
.v-switch--inset .v-switch__track {
  height: 22px !important;
  width: 42px !important;
}
.v-switch__thumb {
  height: 16px !important;
  width: 16px !important;
}
</style>
