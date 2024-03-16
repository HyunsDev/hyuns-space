import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Textarea } from "@/components/ui/textarea";
import { ItemBadge, itemBadges } from "@/data/items/item.type";

export function UpdateBadges() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="뱃지">
      <div className="flex flex-col gap-1 w-full">
        <Textarea
          value={editingItem?.badges?.join("\n") || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({
              ...prev,
              badges: e.target.value
                ? (e.target.value.split("\n") as ItemBadge[])
                : undefined,
            }))
          }
        />
        <div className="text-xs text-muted-foreground font-mono">
          {itemBadges?.join(", ")}
        </div>
      </div>
    </UpdateRow>
  );
}
