import { Input } from "@/components/ui/input";
import { useEditItem } from "@/hooks/useEditItem";

export function ItemFormMultiInput({ name }: { name: string }) {
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
    <div className="flex justify-between gap-2 items-center">
      <div className="w-[200px]">{name}</div>
      <Input value={get() || ""} onChange={(e) => edit(e.target.value)} />
    </div>
  );
}
