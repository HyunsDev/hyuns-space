import { UnderlineInput } from "@/components/UnderlineInput/UnderlineInput";
import { useDevItem } from "@/hooks/useDevItem";

export function UpdateTitle() {
  const { editingItem, setEditingItem } = useDevItem();

  return (
    <div className="flex items-center gap-3">
      {editingItem?.logoImage && (
        <img
          src={editingItem.logoImage}
          alt={`${editingItem.name} 로고`}
          className="size-10 rounded"
        />
      )}
      <div className="flex gap-1 w-full">
        <UnderlineInput
          value={editingItem?.name || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({ ...prev, name: e.target.value }))
          }
          className="font-medium text-3xl h-12"
        />
      </div>
    </div>
  );
}
