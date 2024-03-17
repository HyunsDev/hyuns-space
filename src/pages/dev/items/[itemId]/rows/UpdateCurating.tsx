import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Textarea } from "@/components/ui/textarea";
import { useDevItems } from "@/hooks/useDevItems";

export function UpdateCurating() {
  const { items } = useDevItems();
  const { editingItem, setEditingItem } = useDevItem();

  const curating = [
    ...new Set(
      items
        ?.map((item) => item.curating)
        ?.filter(Boolean)
        ?.flat()
    ),
  ];

  return (
    <UpdateRow label="큐레이션">
      <div className="flex flex-col gap-1 w-full">
        <Textarea
          value={editingItem?.curating?.join("\n") || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({
              ...prev,
              curating: e.target.value ? e.target.value.split("\n") : undefined,
            }))
          }
        />
        <div className="text-xs text-muted-foreground font-mono">
          {curating?.join(", ")}
        </div>
      </div>
    </UpdateRow>
  );
}
