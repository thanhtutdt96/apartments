import { computed, ref } from 'vue';
import { useFetch, useRoute } from '#app';
import { v4 as uuidV4 } from 'uuid';
import useSearchQuery from '~/compasables/useSearchQuery';
import { InventoryForm, InventoryItem } from '~/types/Inventory';

const useInventory = () => {
  const route = useRoute();

  const { searchTerm, config, query } = useSearchQuery();

  const {
    pending: isLoading,
    data: inventoryList,
    refresh,
  } = useFetch<InventoryItem[]>(`/apartments/${route.params.id}/inventories`, {
    baseURL: config.public.API_PATH,
    query,
    watch: [searchTerm],
  });

  const inventoryForm = ref<InventoryForm>({
    photo: null,
    name: '',
    quantity: 0,
  });

  const displayInventoryList = ref<InventoryItem[]>([]);

  const isPreviewVisible = ref(false);
  const isSavingData = ref(false);

  const isInventoryFormFilled = computed(
    () => !!inventoryForm.value.name && inventoryForm.value.quantity > 0,
  );

  const totalQuantities = computed(() =>
    displayInventoryList.value?.reduce((acc, { quantity }) => acc + quantity, 0),
  );

  const isAddButtonDisabled = computed(
    () => totalQuantities.value + inventoryForm.value.quantity > 20 || !isInventoryFormFilled.value,
  );

  const onAddInventory = () => {
    const inventoryItem = { id: uuidV4(), ...inventoryForm.value };

    displayInventoryList.value.push(inventoryItem);
  };

  const onDeleteInventoryItem = (id: string) => {
    displayInventoryList.value = displayInventoryList.value.filter((item) => item.id !== id);
  };

  const onUpdateInventoryItem = (inventoryItem: InventoryItem) => {
    displayInventoryList.value = displayInventoryList.value.map((item) =>
      item.id !== inventoryItem.id ? item : inventoryItem,
    );
  };

  const saveInventoryItem = (inventoryItem: InventoryItem) => {
    return useFetch<InventoryItem[]>(`/apartments/${route.params.id}/inventories`, {
      baseURL: config.public.API_PATH,
      method: 'POST',
      body: { ...inventoryItem },
    });
  };

  const deleteInventoryItem = (inventoryItem: InventoryItem) => {
    return useFetch<InventoryItem>(`/inventories/${inventoryItem.id}`, {
      baseURL: config.public.API_PATH,
      method: 'DELETE',
    });
  };

  const setPreviewVisible = (value: boolean) => {
    isPreviewVisible.value = value;
  };

  const resetForm = () => {
    inventoryForm.value.photo = null;
    inventoryForm.value.name = '';
    inventoryForm.value.quantity = 0;
  };

  const onApproveInventory = async () => {
    isSavingData.value = true;

    const deletePromises = inventoryList.value?.map((item) => deleteInventoryItem(item));
    await Promise.all(deletePromises || []);

    const addPromises = displayInventoryList.value.map((item) => saveInventoryItem(item));
    await Promise.all(addPromises);

    isSavingData.value = false;

    setPreviewVisible(false);
    resetForm();

    await refresh();
  };

  const onCancelInventory = () => {
    setPreviewVisible(false);
  };

  return {
    searchTerm,
    inventoryForm,
    inventoryList,
    displayInventoryList,
    isLoading,
    isAddButtonDisabled,
    isSavingData,
    isPreviewVisible,
    setPreviewVisible,
    onUpdateInventoryItem,
    onDeleteInventoryItem,
    onApproveInventory,
    onCancelInventory,
    onAddInventory,
  };
};

export default useInventory;
