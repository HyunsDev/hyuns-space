import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Input } from "@/components/ui/input";

export function UpdateURL() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="URL">
      <Input
        value={editingItem?.url || ""}
        onChange={(e) =>
          setEditingItem((prev) => ({
            ...prev,
            url: e.target.value || undefined,
          }))
        }
      />
    </UpdateRow>
  );
}
