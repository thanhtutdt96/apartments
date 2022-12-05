<template>
  <div
    class="card md:w-[250px] bg-base-100 shadow-xl hover:brightness-125 hover:cursor-pointer hover:ring-primary-content hover:ring-1"
  >
    <figure>
      <img :src="photoUrl" :alt="address" class="w-full h-full object-cover aspect-[5/3]" />
    </figure>
    <div class="card-body p-4">
      <div class="card-title justify-between">
        <h4 class="text-sm truncate flex-1">{{ address }}</h4>
        <div v-if="isNewItem" class="badge badge-secondary text-xs">NEW</div>
      </div>
      <p v-if="description" class="text-xs text-gray-500">{{ description }}</p>
      <div class="card-actions pt-2">
        <div class="badge badge-outline text-xs">Floor {{ floor }}</div>
        <div class="badge badge-outline badge-accent text-xs">Room {{ doorNumber }}</div>
      </div>
      <div class="mt-2 font-medium text-info">
        ${{ price }} {{ frequency ? `per ${frequency}` : '' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  photoUrl?: string;
  address: string;
  description?: string;
  floor: number;
  doorNumber: number;
  price: number;
  frequency?: string;
  isNewItem?: boolean;
}>();
</script>
