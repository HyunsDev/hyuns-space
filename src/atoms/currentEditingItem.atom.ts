import { Item } from "@/data/items/item.type";
import { atom } from "recoil";

export const currentEditingItemAtom = atom<{
  currentEditingItemId?: string;
  item?: Item;
}>({
  key: "currentEditingItems",
  default: {
    currentEditingItemId: undefined,
    item: undefined,
  },
});
