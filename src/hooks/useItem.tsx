import { items } from "@/data/items/items";
import { useParams } from "react-router-dom";

export function useItem(itemId?: string) {
  const { itemId: paramsItemId } = useParams();
  const __itemId = itemId || paramsItemId;
  const item = items.find((item) => item.id === __itemId);

  return {
    itemId: __itemId,
    item,
  };
}
