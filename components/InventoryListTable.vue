<template>
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th>Photo</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading">
        <td colspan="4">
          <div class="flex justify-center">
            <Loader />
          </div>
        </td>
      </tr>
      <tr v-else-if="!isLoading && displayInventoryList?.length === 0">
        <td colspan="4">No inventory item available.</td>
      </tr>
      <template v-else>
        <slot />
      </template>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { InventoryItem } from '~/types/Inventory';

defineProps<{
  isLoading?: boolean;
  displayInventoryList: InventoryItem[];
}>();
</script>
