<template>
  <div class="flex gap-x-2">
    <button
      class="btn btn-outline btn-accent btn-sm"
      :disabled="isSavingData"
      @click="emits('approve')"
    >
      Approve
    </button>
    <button
      class="btn btn-outline btn-error btn-sm"
      :disabled="isSavingData"
      @click="emits('cancel')"
    >
      Cancel
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  isSavingData?: boolean;
}>();

const emits = defineEmits<{
  (event: 'approve'): void;
  (event: 'cancel'): void;
}>();
</script>
