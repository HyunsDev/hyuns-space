import { Textarea } from "@/components/ui/textarea";
import { useEditItem } from "@/hooks/useEditItem";
import { useState } from "react";

export function ItemFormMultiInput({
  name,
  choices,
}: {
  name: string;
  choices?: string[];
}) {
  const { editingItem, setEditingItem } = useEditItem();
  const [isWrong, setIsWrong] = useState(false);

  const get = () => {
    if (!editingItem.item) {
      return;
    }

    return (
      editingItem?.item?.[name as keyof typeof editingItem.item] as string[]
    )?.join("\n");
  };

  const edit = (value: string) => {
    if (!editingItem.item) {
      return;
    }

    if (
      value &&
      choices &&
      value?.split("\n").some((v) => !choices.includes(v))
    ) {
      setIsWrong(true);
    } else {
      setIsWrong(false);
    }

    setEditingItem({
      ...editingItem,
      item: {
        ...editingItem.item,
        [name]: (value && value.split("\n")) || undefined,
      },
    });
  };

  return (
    <div className="flex justify-between gap-2 items-start">
      <div className="w-[200px] pt-1">{name}</div>
      <div className="flex flex-col gap-1 w-full">
        <Textarea value={get() || ""} onChange={(e) => edit(e.target.value)} />
        {choices && (
          <div className="text-xs text-gray-500 font-mono">
            선택지: {choices.join(", ")}
          </div>
        )}
        {isWrong && (
          <div className="text-xs text-destructive">
            입력값이 올바르지 않아요.
          </div>
        )}
      </div>
    </div>
  );
}
