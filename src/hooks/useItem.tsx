import { useParams } from "react-router-dom";

import { getItem } from "@/utils/getItem";

export function useItem(itemId?: string) {
  const { itemId: paramsItemId } = useParams();
  const __itemId = itemId || paramsItemId;
  const item = getItem(__itemId || "");

  return {
    itemId: __itemId,
    item,
  };
}
