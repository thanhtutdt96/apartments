<template>
  <div class="container mx-auto">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useHead } from '#imports';

const props = defineProps<{
  title: string;
}>();

useHead({
  title: props.title,
});
</script>
