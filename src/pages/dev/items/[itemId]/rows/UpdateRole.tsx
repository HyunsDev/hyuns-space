import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Input } from "@/components/ui/input";

export function UpdateRole() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="역할">
      <Input
        value={editingItem?.role || ""}
        onChange={(e) =>
          setEditingItem((prev) => ({
            ...prev,
            role: e.target.value || undefined,
          }))
        }
      />
    </UpdateRow>
  );
}
