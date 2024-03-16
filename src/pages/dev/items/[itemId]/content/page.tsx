import { Button } from "@/components/ui/button";
import { MainHeader } from "@/containers/header/MainHeader";
import { useDevItem } from "@/hooks/useDevItem";
import Markdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import rehypeRaw from "rehype-raw";

function Back() {
  const { itemId } = useDevItem();
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate(`/dev/items/${itemId}`)} variant={"ghost"}>
      ← 돌아가기
    </Button>
  );
}

export function DevItemContentPage() {
  const { editingItem, setEditingItem, reflect, isReflectPending } =
    useDevItem();

  return (
    <>
      <MainHeader />
      <div className="absolute top-0 left-0 w-full h-full py-[60px] px-4">
        <div className="h-10">
          <Back />
        </div>
        <div className="flex gap-2 h-full">
          <div className="flex-1 h-full overflow-auto">
            <textarea
              className="max-h-[calc(100%-40px)] h-full w-full font-mono text-[15px] focus:outline-none"
              value={editingItem?.content || ""}
              onChange={(e) =>
                setEditingItem((prev) => ({
                  ...prev,
                  content: e.target.value,
                }))
              }
            />
            <div className="flex justify-between h-10">
              <div className=""></div>
              <div className="">
                <Button onClick={() => reflect()} disabled={isReflectPending}>
                  반영하기
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 h-full overflow-auto">
            <div className="markdown">
              <Markdown rehypePlugins={[rehypeRaw]}>
                {editingItem?.content}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
