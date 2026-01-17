import { UpdateRow } from "./UpdateRow";

import { Textarea } from "@/components/ui/textarea";
import { useDevItem } from "@/hooks/useDevItem";

export function UpdateURLs() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="URLs">
      <Textarea
        value={editingItem?.urls?.join("\n") || ""}
        onChange={(e) =>
          setEditingItem((prev) => ({
            ...prev,
            urls: e.target.value ? e.target.value.split("\n") : undefined,
          }))
        }
        placeholder={`https://github.com/HyunsDev/xxxxxxxx\nhttps://example.com`}
      />
    </UpdateRow>
  );
}
