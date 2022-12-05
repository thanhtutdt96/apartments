<template>
  <tr>
    <td>
      <InventoryAvatar
        v-if="inventoryItem.photoUrl"
        :photo-url="inventoryItem.photoUrl"
        :name="inventoryItem.name"
      />
      <div v-else class="avatar placeholder">
        <div class="rounded-xl w-12 h-12 bg-neutral text-neutral-content">
          <span class="text-2xl">{{ inventoryItem.name?.charAt(0)?.toUpperCase() }}</span>
        </div>
      </div>
    </td>
    <td class="font-medium text-sm">
      {{ inventoryItem.name }}
    </td>
    <td class="text-sm">
      <input
        v-if="isEditing"
        v-model="quantity"
        type="number"
        class="input w-full input-bordered max-w-[4rem] input-xs text-sm"
      />
      <template v-else>
        {{ quantity }}
      </template>
    </td>
    <td>
      <div>
        <button
          v-if="!isEditing"
          class="btn btn-outline btn-info btn-xs"
          :disabled="isPreviewVisible"
          @click="setEditing(true)"
        >
          Update
        </button>
        <button
          v-else
          class="btn btn-outline btn-accent btn-xs"
          :disabled="isPreviewVisible"
          @click="onUpdateInventoryItem(inventoryItem)"
        >
          Save
        </button>
      </div>
      <div class="mt-2">
        <button
          class="btn btn-outline btn-error btn-xs"
          :disabled="isPreviewVisible"
          @click="emits('delete', inventoryItem.id)"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InventoryItem } from '~/types/Inventory';
import InventoryAvatar from '~/components/InventoryAvatar.vue';

const props = defineProps<{
  inventoryItem: InventoryItem;
  isPreviewVisible?: boolean;
}>();

const emits = defineEmits<{
  (event: 'delete', value: string): void;
  (event: 'update', value: InventoryItem): void;
}>();

const quantity = ref(props.inventoryItem.quantity);
const isEditing = ref(false);

const setEditing = (value: boolean) => {
  isEditing.value = value;
};

const onUpdateInventoryItem = (inventoryItem: InventoryItem) => {
  setEditing(false);

  emits('update', { ...inventoryItem, quantity: quantity.value });
};
</script>
