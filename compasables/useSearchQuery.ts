import { useRuntimeConfig } from '#app';
import { computed, ref } from 'vue';

const useSearchQuery = () => {
  const config = useRuntimeConfig();

  const searchTerm = ref('');

  const isSearching = computed(() => searchTerm.value.length > 0);

  const query = computed(() => {
    if (!isSearching.value) {
      return {};
    }

    return {
      q: searchTerm.value?.trim(),
    };
  });

  return {
    config,
    searchTerm,
    isSearching,
    query,
  };
};

export default useSearchQuery;
