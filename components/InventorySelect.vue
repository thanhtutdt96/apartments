<template>
  <select
    :value="modelValue"
    class="select select-bordered w-full max-w-xs select-sm mb-2"
    @change="emit('update:modelValue', $event.target.value)"
  >
    <option v-for="item in inventoryOptions" :key="item.id" :value="item.label">
      {{ item.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { useFetch, useRuntimeConfig } from '#app';

defineProps<{
  modelValue: string;
}>();

type InventoryOption = {
  id: string;
  label: string;
};

const config = useRuntimeConfig();

const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>();

const { data: inventoryOptions } = await useFetch<InventoryOption[]>('/options', {
  baseURL: config.public.API_PATH,
});

emit('update:modelValue', inventoryOptions.value?.[0]?.label || '');
</script>
