<script setup>
import { useManagersStore } from '../stores/store.js'
const managersStore = useManagersStore()

defineProps({
  isDialogOpen: {
    type: Boolean,
    required: true
  },
  isCreate: {
    type: Boolean,
    required: true
  },
  manager: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => emit('update:modelValue', false)

const saveManager = (id, manager) => {
  managersStore.updateManager(id, manager)
  closeModal()
}

const createManager = (manager) => {
  managersStore.createManager({ ...manager, isActive: false })
  closeModal()
}
</script>
<template>
  <v-dialog
    :model-value="isDialogOpen"
    @update:modelValue="(event) => $emit('update:modelValue', event)"
    width="auto"
  >
    <v-card>
      <p>ФИО</p>
      <v-text-field
        v-model="manager.name"
        clearable
        placeholder="Введите фио"
        type="input"
        variant="outlined"
      ></v-text-field>
      <p>Логин</p>
      <v-text-field
        v-model="manager.login"
        clearable
        placeholder="Введите логин"
        type="input"
        variant="outlined"
      ></v-text-field>
      <p>Почта</p>
      <v-text-field
        v-model="manager.email"
        clearable
        placeholder="Введите почту"
        type="email"
        variant="outlined"
      ></v-text-field>
      <p>Компания</p>
      <v-select
        clearable
        v-model="manager.company"
        :items="['Юридическое лицо', 'ИП', 'Самозанятый']"
        variant="outlined"
      ></v-select>
      <v-card-actions>
        <v-btn color="secondary" @click="closeModal">Close Dialog</v-btn>

        <v-btn v-if="isCreate" color="primary" @click="() => createManager(manager)"
          >Добавить</v-btn
        >
        <v-btn v-else color="primary" @click="() => saveManager(manager.id, manager)"
          >Сохранить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
