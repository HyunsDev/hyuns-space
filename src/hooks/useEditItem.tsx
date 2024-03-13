import { currentEditingItemAtom } from "@/atoms/currentEditingItem.atom";
import { useRecoilState } from "recoil";
import { useItem } from "./useItem";
import { getItem } from "@/utils/getItem";
import dayjs from "dayjs";

export function useEditItem() {
  const [editingItem, setEditingItem] = useRecoilState(currentEditingItemAtom);
  const { item: originalItem } = useItem(editingItem.currentEditingItemId);

  const setEditingItemId = (id: string) => {
    setEditingItem({
      currentEditingItemId: id,
      item: getItem(id) || {
        id,
        name: "",
        type: "project",
        description: "",
        period: "",
        tags: [],
        updatedAt: dayjs().format("YYYY-MM-DD"),
        badges: [],
        content: "",
        logoImage: "",
        role: "",
        thumbnailImage: `/items/${id}/thumbnail.png`,
        url: "",
        urls: [],
      },
    });
  };

  return {
    editingItem,
    editingItemId: editingItem.currentEditingItemId,
    setEditingItem,
    setEditingItemId,
    originalItem,
  };
}
