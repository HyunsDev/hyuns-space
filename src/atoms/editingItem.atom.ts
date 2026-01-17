import { atom } from "recoil";

import { Item } from "@/data/items/item.type";

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
