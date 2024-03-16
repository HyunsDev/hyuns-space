import { Item } from "@/data/items/item.type";
import { atom } from "recoil";

export type EditingItem = {
  itemId: string;
  item?: Item;
};

export const EditingItemAtom = atom<EditingItem>({
  key: "EditingItem",
  default: {
    itemId: "",
    item: undefined,
  },
});
