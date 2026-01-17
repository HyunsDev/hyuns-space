import { UpdateRow } from "./UpdateRow";

import { Input } from "@/components/ui/input";
import { useDevItem } from "@/hooks/useDevItem";

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
