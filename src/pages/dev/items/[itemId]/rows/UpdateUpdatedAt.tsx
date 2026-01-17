import dayjs from "dayjs";

import { UpdateRow } from "./UpdateRow";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDevItem } from "@/hooks/useDevItem";


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
