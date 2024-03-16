import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/libs/client";
import { useRecoilState } from "recoil";
import { EditingItemAtom } from "@/atoms/editingItem.atom";
import { useEffect, useMemo } from "react";
import { Item } from "@/data/items/item.type";
import { useDevItems } from "./useDevItems";

export function useDevItem(itemId?: string) {
  const { items, mutate, isMutatePending } = useDevItems();
  const { itemId: paramsItemId } = useParams();
  const __itemId = useMemo(
    () => itemId || paramsItemId,
    [itemId, paramsItemId]
  );
  const [editingItem, setEditingItem] = useRecoilState(EditingItemAtom);

  const { data } = useQuery({
    queryKey: ["items", __itemId],
    queryFn: () => client.GetItem({ itemId: __itemId || "" }),
  });

  useEffect(() => {
    setEditingItem({
      itemId: __itemId || "",
      item: data?.item,
    });
  }, [__itemId, data?.item, setEditingItem]);

  const resetEditingItem = () => {
    setEditingItem({
      itemId: "",
      item: data?.item,
    });
  };

  const updateEditingItem = (item: Item | ((prev: Item) => Item)) => {
    setEditingItem({
      itemId: __itemId || "",
      item: item instanceof Function ? item(editingItem.item!) : item,
    });
  };

  const reflect = () => {
    if (!items || !editingItem.item) return;

    const index = items?.findIndex((item) => item.id === editingItem.itemId);
    if (index === -1) {
      const newItems = [
        ...items,
        {
          ...editingItem.item,
          id: editingItem.itemId,
        },
      ];
      mutate(newItems);
      return;
    } else {
      const newItems = [...items];
      newItems[index] = editingItem.item;
      mutate(newItems);
    }
  };

  return {
    itemId: __itemId,
    item: data?.item,
    files: data?.files,

    editingItem: editingItem.item,
    setEditingItem: updateEditingItem,
    resetEditingItem,
    reflect,
    isReflectPending: isMutatePending,
  };
}
