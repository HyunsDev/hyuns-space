import { MainHeader } from "@/containers/share/header/MainHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ItemList } from "@/containers/dev/ItemList/ItemList";
import { Button } from "@/components/ui/button";
import { useDevItems } from "@/hooks/useDevItems";
import { CreateItemDialog } from "@/containers/dialogs/CreateItemDialog";

function ServerConnectBadge() {
  const [connectStatus, setConnectStatus] = useState<
    "connected" | "disconnected" | "pending"
  >("pending");

  useEffect(() => {
    (async () => {
      try {
        await axios.get("http://localhost:3000");
        setConnectStatus("connected");
      } catch (e) {
        setConnectStatus("disconnected");
      }
    })();
  }, []);

  if (connectStatus === "pending") {
    return (
      <div className="px-3 py-0.5 text-sm text-muted-foreground bg-muted rounded-full w-fit">
        연결 중이에요.
      </div>
    );
  }

  if (connectStatus === "connected") {
    return (
      <div className="px-2 py-0.5 text-sm text-green-600 bg-green-200 rounded-full w-fit">
        연결되었어요!
      </div>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="px-3 py-0.5 text-sm text-red-600 bg-red-200 rounded-full w-fit">
          연결할 수 없어요.
        </div>
      </TooltipTrigger>
      <TooltipContent>
        터미널에서 <code>yarn server:start</code>를 실행해주세요.
      </TooltipContent>
    </Tooltip>
  );
}

export function DevPage() {
  const { items } = useDevItems();

  return (
    <>
      <MainHeader />
      <div className="max-w-[900px] w-full px-4 mx-auto my-[90px]">
        <div className="h-[200px] flex items-end">
          <div className="flex flex-col">
            <div className="font-bold text-8xl">Dev</div>
            <ServerConnectBadge />
          </div>
        </div>
        <div className="my-4">
          <div className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              총 {items?.length}개의 아이템이 있어요.
            </div>
            <CreateItemDialog
              trigger={<Button variant="default">추가하기</Button>}
            />
          </div>
          <ItemList />
        </div>
      </div>
    </>
  );
}
