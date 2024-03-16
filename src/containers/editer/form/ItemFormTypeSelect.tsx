import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Item } from "@/data/items/item.type";
import { useEditItem } from "@/hooks/useEditItem";

type Keys = "type";
export function ItemFormTypeSelect<T extends Keys, U extends Item[T]>({
  name,
  choices,
}: {
  name: T;
  choices: U[];
}) {
  const { editingItem, setEditingItem } = useEditItem();

  const get = () => {
    if (!editingItem.item) return;
    return editingItem?.item?.[name] as U;
  };

  const edit = (value: U) => {
    if (!editingItem.item) {
      return;
    }
    setEditingItem({
      ...editingItem,
      item: {
        ...editingItem.item,
        type: value,
      },
    });
  };

  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="w-[200px]">type</div>
      <Select value={get()} onValueChange={(e) => edit(e as U)}>
        <SelectTrigger>
          <SelectValue placeholder="아이템을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          {choices.map((choice) => (
            <SelectItem key={choice} value={choice}>
              {choice}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
