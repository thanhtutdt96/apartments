export type InventoryItem = {
  id: string;
  photoUrl?: string;
  name: string;
  quantity: number;
};

export type InventoryForm = {
  photo?: File | null;
  name: string;
  quantity: number;
};
