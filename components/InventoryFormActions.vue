<template>
  <div class="flex gap-x-2">
    <button
      class="btn btn-outline btn-accent btn-sm"
      :disabled="isAddButtonDisabled"
      @click="emits('add')"
    >
      Add
    </button>
    <button class="btn btn-outline btn-secondary btn-sm" @click="emits('preview')">Preview</button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isAddButtonDisabled?: boolean;
}>();

const emits = defineEmits<{
  (event: 'add'): void;
  (event: 'preview'): void;
}>();
</script>
