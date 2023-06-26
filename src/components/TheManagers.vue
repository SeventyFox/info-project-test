<script setup>
import { ref, onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useManagersStore } from '../stores/store.js'
import ManagerModal from './ManagerModal.vue'
import TablePagination from './TablePagination.vue'
import { parse, unparse } from 'papaparse'
import { format } from 'date-fns'

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

const csvData = ref([])

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  parse(file, {
    header: true,
    complete: (results) => {
      csvData.value = results.data
      managersStore.importManager(csvData.value)
      pageCount.value = Math.ceil(managersStore.managers.length / itemsPerPage.value)
    }
  })
}

const exportManagers = () => {
  const unparsedData = unparse(managersStore.managers, {
    quotes: false,
    quoteChar: '"',
    escapeChar: '"',
    delimiter: ',',
    header: true,
    newline: '\r\n',
    skipEmptyLines: false,
    columns: null
  })
  const data = unparsedData
  const blob = new Blob([data], { type: 'text/plain' })

  const a = document.createElement('a')
  a.download = `exportManagers_${format(new Date(), 'dd-MM-yyyy-h-m-s')}`
  a.href = URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')

  const event = new MouseEvent('click')
  a.dispatchEvent(event)
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
    <div class="header">
      <v-icon class="header__icon header__burger" icon="mdi-text"></v-icon>
      <h4 class="header__title">Управление компанией</h4>
      <v-icon class="header__icon header__notification" icon="mdi-bell"></v-icon>
      <v-icon class="header__icon header__cart" icon="mdi-cart"></v-icon>
    </div>
    <v-tabs class="custom-button">
      <v-tab>мои компании</v-tab>
      <v-tab selected>мои менеджеры</v-tab>
    </v-tabs>
    <div class="manager__search">
      <v-text-field
        v-model="searchString"
        placeholder="Быстрый поиск"
        prepend-inner-icon="mdi-magnify"
        variant="text"
        density="compact"
        hide-details
      ></v-text-field>
    </div>
    <div class="manager__group mb-3">
      <v-btn
        prepend-icon="mdi-filter-variant"
        class="rounded-xl text-capitalize custom-button manager__filter font-weight-regular"
        color="grey-darken-2"
        variant="tonal"
      >
        <template v-slot:prepend>
          <v-icon class="manager__icon"></v-icon>
        </template>
        Фильтр
        <template v-slot:append>
          <v-badge color="blue-darken-2" content="1  " inline></v-badge>
        </template>
      </v-btn>
      <v-btn
        prepend-icon="mdi-plus"
        class="rounded-xl text-capitalize custom-button manager__add bg-blue-darken-2 font-weight-regular"
        color="white"
        variant="tonal"
        @click="openCreateManager"
        rounded-xl
      >
        <template v-slot:prepend>
          <v-icon color="white" class="manager__icon"></v-icon>
        </template>
        Добавить
      </v-btn>
    </div>
    <div class="d-flex justify-space-between mb-3 manager__import">
      <v-file-input
        class="manager__file-input"
        @change="handleFileUpload"
        hide-details
        dense
        accept=".csv"
        label="Импортировать"
        variant="outlined"
      />
      <v-btn @click="exportManagers">Экспорт</v-btn>
    </div>

    <v-data-table
      v-model:page="page"
      :headers="tableHeaders"
      :items="managersStore.managers"
      :items-per-page="itemsPerPage"
      item-value="name"
      :search="searchString"
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
        <v-switch
          color="blue-darken-2"
          v-model="item.raw.isActive"
          inset
          hide-details
          density="comfortable"
        ></v-switch
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

:deep(.v-tab__slider) {
  background: #1976d2 !important;
}

.v-slide-group-item--active {
  color: #1976d2;
  background-color: #eff5ff;
}

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
  &__file-input {
    max-width: 200px;
  }
  &__import {
    margin: 0 16px;
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
  font-size: 13px;
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

.v-table .v-data-table-header__sort-icon,
.v-data-table-header__content {
  font-size: 12px;
  color: #3c3f41;
}

.v-badge__badge {
  font-size: 10px;
  border-radius: 10px !important;
  height: 16px !important;
}

.v-switch__track {
  background-color: #b0bec5 !important;
}

.v-selection-control--dirty .v-switch__track {
  background-color: #cadeff !important;
}

.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > td,
.v-table .v-table__wrapper > table > tbody > tr:not(:last-child) > th {
  border-bottom: unset;
}

.v-table .v-table__wrapper > table > thead > tr > th {
  border-bottom: unset;
}

.v-field__outline {
  border: 1px solid #dde2e5;
  border-radius: 4px;
}

.v-btn {
  min-width: 0;
}

.manager__group :deep(.v-btn) {
  padding-left: 16px;
  padding-right: 16px;
  width: 112px;
}
</style>
