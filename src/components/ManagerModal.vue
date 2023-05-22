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
    width="309"
  >
    <v-card>
      <v-card-title>
        <div class="d-flex justify-space-between">
          <p>Добавить менеджера</p>
          <v-icon @click="closeModal" class="modal__icon" icon="mdi-close"></v-icon>
        </div>
      </v-card-title>
      <v-card-text>
        <p class="font-weight-regular text-body-2 text-medium-emphasis">ФИО</p>
        <v-text-field
          v-model="manager.name"
          clearable
          placeholder="Введите фио"
          type="input"
          variant="text"
          density="compact"
        ></v-text-field>
        <p class="font-weight-regular text-body-2 text-medium-emphasis">Логин</p>
        <v-text-field
          v-model="manager.login"
          clearable
          placeholder="Введите логин"
          type="input"
          variant="text"
          density="compact"
        ></v-text-field>
        <p class="font-weight-regular text-body-2 text-medium-emphasis">Почта</p>
        <v-text-field
          v-model="manager.email"
          clearable
          placeholder="Введите почту"
          type="email"
          variant="text"
          density="compact"
        ></v-text-field>
        <p class="font-weight-regular text-body-2 text-medium-emphasis">Компания</p>
        <v-select
          clearable
          v-model="manager.company"
          :items="['Юридическое лицо', 'ИП', 'Самозанятый']"
          variant="text"
          hide-details
          density="compact"
        ></v-select>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn
          class="rounded custom-button manager__add font-weight-regular text-high-emphasis"
          variant="text"
          @click="closeModal"
          >отменить</v-btn
        >

        <v-btn
          class="rounded custom-button manager__add bg-blue-darken-2 font-weight-regular"
          color="white"
          variant="tonal"
          v-if="isCreate"
          @click="() => createManager(manager)"
          >Добавить</v-btn
        >
        <v-btn
          class="rounded custom-button manager__add bg-blue-darken-2 font-weight-regular"
          color="white"
          variant="tonal"
          v-else
          @click="() => saveManager(manager.id, manager)"
          >Сохранить</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.modal__icon {
  color: #717475;
}
</style>
