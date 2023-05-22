<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    required: true
  },
  length: {
    type: Number,
    required: true
  }
})
</script>
<template>
  <div class="pagination d-flex justify-space-between align-center mb-2">
    <v-pagination
      :model-value="modelValue"
      @update:model-value="(event) => $emit('update:modelValue', event)"
      :length="length"
      total-visible="1"
      variant="plain"
      hide-details
      density="comfortable"
    >
      <template v-slot:item="item"> {{ item.page }} из {{ length }} </template>
    </v-pagination>
    <v-select
      :items="[5, 10, 15, 25]"
      :model-value="itemsPerPage"
      variant="underlined"
      density="compact"
      hide-details
      @update:model-value="(event) => $emit('update:itemsPerPage', event)"
    >
      <template v-slot:prepend-inner="item">
        <span class="font-weight-medium">ПОКАЗАТЬ</span> {{ item.messagesId }}
      </template></v-select
    >
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  margin: 0 16px;
  height: 32px;
}
:deep(.v-pagination__item) {
  padding: 8px 12px;
  border-top: 1px solid #dde2e5;
  border-bottom: 1px solid #dde2e5;
  font-size: 13px;
  line-height: 13px;
}
:deep(.v-pagination__item, .v-pagination__prev, .v-pagination__next) {
  margin: 0.3rem 0 !important;
  height: 32px;
}
:deep(.v-pagination__item .v-btn, .v-pagination__next .v-btn) {
  height: 32px;
}

.pagination :deep(.v-field) {
  height: 32px;
  font-size: 12px;
}
.pagination :deep(.v-input) {
  width: 158px;
  max-width: 158px;
}
:deep(.v-pagination__prev) {
  border: 1px solid #dde2e5;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  height: 32px;
  margin: 0.3rem 0 !important;
}
:deep(.v-pagination__next) {
  border: 1px solid #dde2e5;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  height: 32px;
  margin: 0.3rem 0 !important;
}
:deep(.v-btn) {
  height: 32px;
}
:deep(.v-select__selection-text) {
  font-weight: 500;
}
:deep(.v-field__outline) {
  --v-field-border-width: 0px !important;
}
:deep(.v-field__input) {
  padding-top: 8px;
}
.v-select .v-field__input {
  min-height: 7px !important;
  border-right: thin solid#dde2e5;
  padding-bottom: 0px;
  margin-top: 1px;
}
:deep(.v-field__prepend-inner) {
  padding-left: 16px;
}
</style>
