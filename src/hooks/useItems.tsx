import { Item, ItemBadge, ItemType } from "@/data/items/item.type";
import { items } from "@/data/items/items";

export type UseItemsOptions = {
  type?: ItemType;
  curating?: string[];
  badges?: ItemBadge[];
  limit?: number;
  tags?: string[];
};
export function useItems(options?: UseItemsOptions) {
  let result: Item[] = items;

  if (options?.type) {
    result = result.filter((item) => item.type === options?.type);
  }

  if (options?.curating) {
    result = result.filter((item) =>
      item.curating?.some((c) => options?.curating?.includes(c))
    );
  }

  if (options?.tags) {
    result = result.filter((item) =>
      item?.tags?.some((tag) => options?.tags?.includes(tag))
    );
  }

  if (options?.badges) {
    result = result.filter((item) =>
      item?.badges?.some((badge) => options?.badges?.includes(badge))
    );
  }

  if (options?.limit) {
    result = result.slice(0, options?.limit);
  }

  return {
    items: result,
    total: items.length,
  };
}
