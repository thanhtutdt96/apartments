<template>
  <h3 class="text-center text-xl pt-5 font-bold">Apartments</h3>
  <div class="flex justify-center mt-4">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search apartments..."
      class="input input-bordered w-full max-w-xs input-sm"
    />
  </div>
  <div class="hero min-h-screen mt-5 items-start">
    <div class="flex-col md:flex-row hero-content flex-wrap gap-y-6">
      <div v-if="isLoading">
        <Loader />
      </div>
      <div v-else-if="!isLoading && apartments?.length === 0">No apartments found.</div>
      <NuxtLink
        v-for="apartment in apartments"
        v-else
        :key="apartment.id"
        :to="`/apartments/${apartment.id}`"
      >
        <ApartmentItem
          :photo-url="apartment.photoUrl"
          :address="apartment.address"
          :description="apartment.description"
          :floor="apartment.floor"
          :door-number="apartment.doorNumber"
          :price="apartment.price"
          :frequency="apartment.frequency"
          :is-new-item="apartment.isNewItem"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useFetch } from '#app';
import { useHead } from '#imports';
import useSearchQuery from '~/compasables/useSearchQuery';

type ApartmentItem = {
  photoUrl?: string;
  address: string;
  description?: string;
  floor: number;
  doorNumber: number;
  price: number;
  frequency?: string;
  isNewItem?: boolean;
  id: string;
};

useHead({
  title: 'Apartments',
});

const { config, searchTerm, query } = useSearchQuery();

const { pending: isLoading, data: apartments } = useFetch<ApartmentItem[]>('/apartments', {
  baseURL: config.public.API_PATH,
  query,
  watch: [query],
});
</script>
