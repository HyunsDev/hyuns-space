import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateItemDialog({ trigger }: { trigger: ReactNode }) {
  const navigate = useNavigate();
  const [itemId, setItemId] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>새로운 아이템을 추가합니다</DialogHeader>
        <Input
          placeholder="id"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
        />
        <DialogFooter>
          <Button onClick={() => navigate(`/dev/items/${itemId}`)}>
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
