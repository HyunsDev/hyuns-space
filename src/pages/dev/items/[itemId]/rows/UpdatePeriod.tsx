import { UpdateRow } from "./UpdateRow";

import { Input } from "@/components/ui/input";
import { useDevItem } from "@/hooks/useDevItem";

export function UpdatePeriod() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="기간">
      <Input
        value={editingItem?.period || ""}
        onChange={(e) =>
          setEditingItem((prev) => ({
            ...prev,
            period: e.target.value,
          }))
        }
      />
    </UpdateRow>
  );
}
