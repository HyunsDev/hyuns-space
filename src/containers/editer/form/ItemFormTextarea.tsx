import { Textarea } from "@/components/ui/textarea";
import { useEditItem } from "@/hooks/useEditItem";

export function ItemFormTextarea({ name }: { name: string }) {
  const { editingItem, setEditingItem } = useEditItem();

  const get = () => {
    if (!editingItem.item) {
      return;
    }

    return editingItem?.item?.[name as keyof typeof editingItem.item];
  };

  const edit = (value: string) => {
    if (!editingItem.item) {
      return;
    }

    setEditingItem({
      ...editingItem,
      item: {
        ...editingItem.item,
        [name]: value,
      },
    });
  };

  return (
    <div className="flex justify-between gap-2 items-start">
      <div className="w-[200px] pt-1">{name}</div>
      <Textarea value={get() || ""} onChange={(e) => edit(e.target.value)} />
    </div>
  );
}
