import { Item, ItemType } from "@/data/items/item.type";
import { items } from "@/data/items/items";

export function useItems(options?: {
  type?: ItemType;
  curating?: string[];
  limit?: number;
}) {
  const { type, curating, limit } = options || {};
  let result: Item[] = items;

  if (type) {
    result = result.filter((item) => item.type === type);
  }

  if (curating) {
    result = result.filter((item) =>
      item.curating?.some((c) => curating.includes(c))
    );
  }

  if (limit) {
    result = result.slice(0, limit);
  }

  return {
    items: result,
    total: items.length,
  };
}
