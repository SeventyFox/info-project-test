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
  <div class="d-flex">
    <v-pagination
      :model-value="modelValue"
      @update:model-value="(event) => $emit('update:modelValue', event)"
      :length="length"
      total-visible="1"
      variant="plain"
      density="comfortable"
    >
      <template v-slot:item="item"> {{ item.page }} из {{ length }} </template>
    </v-pagination>
    <v-select
      :items="[5, 10, 15, 25]"
      :model-value="itemsPerPage"
      variant="outlined"
      density="comfortable"
      @update:model-value="(event) => $emit('update:itemsPerPage', event)"
    >
      <template v-slot:prepend-inner="item">
        <span class="font-weight-medium">ПОКАЗАТЬ</span> {{ item.messagesId }}
      </template></v-select
    >
  </div>
</template>

<style lang="scss">
.v-pagination__item {
  padding: 8px 12px;
  border-top: 1px solid #DDE2E5;
  border-bottom: 1px solid #DDE2E5;
}
.v-pagination__item,
.v-pagination__prev,
.v-pagination__next {
  margin: 0.3rem 0 !important;
}

.v-pagination__prev {
  border: 1px solid #DDE2E5;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.v-pagination__next {
  border: 1px solid #DDE2E5;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.v-select__selection-text {
  font-weight: 500;
}
</style>
