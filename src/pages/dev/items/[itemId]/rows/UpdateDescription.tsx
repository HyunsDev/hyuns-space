import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Textarea } from "@/components/ui/textarea";

export function UpdateDescription() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="설명">
      <Textarea
        value={editingItem?.description || ""}
        onChange={(e) =>
          setEditingItem((prev) => ({ ...prev, description: e.target.value }))
        }
      />
    </UpdateRow>
  );
}
