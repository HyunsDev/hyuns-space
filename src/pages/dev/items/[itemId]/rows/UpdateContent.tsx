import { Link } from "react-router-dom";

import { UpdateRow } from "./UpdateRow";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDevItem } from "@/hooks/useDevItem";


export function UpdateContent() {
  const { itemId, editingItem, setEditingItem } = useDevItem();

  return (
    <UpdateRow label="소개">
      <div className="w-full flex flex-col gap-1">
        <div className="w-full flex justify-between">
          <div className=""></div>
          <div className="flex">
            <Button asChild variant={"outline"}>
              <Link to={`/dev/items/${itemId}/content`}>편집하기</Link>
            </Button>
          </div>
        </div>
        <Textarea
          value={editingItem?.content || ""}
          onChange={(e) =>
            setEditingItem((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          className="h-[300px]"
        />
      </div>
    </UpdateRow>
  );
}
