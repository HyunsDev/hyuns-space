import { items } from "@/data/items/items";

export function getItem(itemId: string) {
  const item = items.find((item) => item.id === itemId);
  if (item && !item?.thumbnailImage) {
    item.thumbnailImage = `/items/${item.id}/thumbnail.png`;
  }

  return item;
}
