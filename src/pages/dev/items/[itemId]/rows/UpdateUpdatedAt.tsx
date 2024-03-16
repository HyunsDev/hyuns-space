import { useDevItem } from "@/hooks/useDevItem";
import { UpdateRow } from "./UpdateRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export function UpdateUpdatedAt() {
  const { editingItem, setEditingItem } = useDevItem();

  const setNow = () => {
    setEditingItem((prev) => ({
      ...prev,
      updatedAt: dayjs().format("YYYY-MM-DD"),
    }));
  };

  return (
    <UpdateRow label="UpdatedAt">
      <div className="flex w-full gap-1">
        <Input
          className="w-full"
          value={editingItem?.updatedAt || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({
              ...prev,
              updatedAt: e.target.value,
            }))
          }
        />
        <Button variant={"outline"} onClick={() => setNow()}>
          now
        </Button>
      </div>
    </UpdateRow>
  );
}
