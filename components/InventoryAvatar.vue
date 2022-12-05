<template>
  <div class="avatar">
    <div class="rounded-xl w-12 h-12">
      <img :src="photoUrl" :alt="name" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  photoUrl: string;
  name: string;
}>();
</script>
