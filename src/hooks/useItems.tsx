import { Item, ItemType } from "@/data/items/item.type";
import { items } from "@/data/items/items";

export function useItems(options?: { type?: ItemType; limit?: number }) {
  const { type, limit } = options || {};
  let result: Item[] = items;

  if (type) {
    result = result.filter((item) => item.type === type);
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return {
    items: result,
    total: items.length,
  };
}
