import { ItemType, itemTypes } from "@/data/items/item.type";
import { useDevItem } from "@/hooks/useDevItem";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UpdateRow } from "./UpdateRow";

export function UpdateType() {
  const { editingItem, setEditingItem } = useDevItem();

  const onChange = (value: string) => {
    setEditingItem((prev) => ({ ...prev, type: value as ItemType }));
  };

  return (
    <UpdateRow label="타입">
      <Select value={editingItem?.type || ""} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {itemTypes.map((type) => (
            <SelectItem key={type} value={type} className="p-2">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </UpdateRow>
  );
}
