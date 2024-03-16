import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Textarea } from "@/components/ui/textarea";
import { useDevItems } from "@/hooks/useDevItems";

export function UpdateStacks() {
  const { items } = useDevItems();
  const { editingItem, setEditingItem } = useDevItem();

  const stacks = items
    ?.map((item) => item.stacks)
    ?.filter(Boolean)
    ?.flat();

  return (
    <UpdateRow label="스택">
      <div className="flex flex-col gap-1 w-full">
        <Textarea
          value={editingItem?.stacks?.join("\n") || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({
              ...prev,
              stacks: e.target.value ? e.target.value.split("\n") : undefined,
            }))
          }
        />
        <div className="text-xs text-muted-foreground font-mono">
          {stacks?.join(", ")}
        </div>
      </div>
    </UpdateRow>
  );
}
