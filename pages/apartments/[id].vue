<template>
  <h3 class="text-center text-xl pt-5 font-bold">Inventory List</h3>

  <div class="hero min-h-screen mt-5 items-start overflow-x-auto">
    <div class="hero-content flex-col md:flex-row items-start">
      <div v-if="!isPreviewVisible" class="form-control w-full">
        <label class="label">
          <span class="label-text">Inventory name</span>
        </label>
        <InventorySelect v-model="inventoryForm.name" />

        <label class="label">
          <span class="label-text">Inventory quantity</span>
        </label>
        <input
          v-model="inventoryForm.quantity"
          type="number"
          class="input input-bordered w-full max-w-xs input-sm mb-5"
        />

        <InventoryFormActions
          :is-add-button-disabled="isAddButtonDisabled"
          @add="onAddInventory"
          @preview="setPreviewVisible(true)"
        />

        <div class="text-xs text-base-content mt-2 opacity-70">
          Please preview & approve changes after update items
        </div>
      </div>

      <div class="flex flex-col w-full">
        <div class="flex justify-center mb-4">
          <Loader v-if="isSavingData" />
        </div>
        <input
          v-if="!isPreviewVisible"
          v-model="searchTerm"
          type="text"
          placeholder="Search inventory name..."
          class="input input-bordered w-full max-w-full input-sm my-3"
        />

        <InventoryListTable :is-loading="isLoading" :display-inventory-list="displayInventoryList">
          <InventoryRowItem
            v-for="item in displayInventoryList"
            :key="item.id"
            :inventory-item="item"
            :is-preview-visible="isPreviewVisible"
            @delete="onDeleteInventoryItem"
            @update="onUpdateInventoryItem"
          />
        </InventoryListTable>

        <InventoryPreviewActions
          v-if="isPreviewVisible"
          :is-saving-data="isSavingData"
          class="mt-4"
          @approve="onApproveInventory"
          @cancel="onCancelInventory"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useHead } from '#imports';
import useInventory from '~/compasables/useInventory';

useHead({
  title: 'Inventory List',
});

const {
  inventoryForm,
  inventoryList,
  searchTerm,
  displayInventoryList,
  isAddButtonDisabled,
  isSavingData,
  isPreviewVisible,
  isLoading,
  setPreviewVisible,
  onApproveInventory,
  onCancelInventory,
  onUpdateInventoryItem,
  onDeleteInventoryItem,
  onAddInventory,
} = useInventory();

watch(
  inventoryList,
  (value) => {
    if ((value?.length || 0) > 0) {
      displayInventoryList.value = [...(value || [])];
    }
  },
  { deep: true },
);
</script>
