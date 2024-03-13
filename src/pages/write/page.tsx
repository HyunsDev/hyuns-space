import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ItemFormInput } from "@/containers/editer/form/ItemFormInput";
import { ItemFormTextarea } from "@/containers/editer/form/ItemFormTextarea";
import { ItemFormTypeSelect } from "@/containers/editer/form/ItemFormTypeSelect";
import { MainHeader } from "@/containers/header/MainHeader";
import { useEditItem } from "@/hooks/useEditItem";
import { useItems } from "@/hooks/useItems";

function SelectItemSection() {
  const { items } = useItems();
  const { setEditingItemId, editingItemId } = useEditItem();

  return (
    <div className="flex gap-2">
      <Select value={editingItemId} onValueChange={(e) => setEditingItemId(e)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="아이템을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
            <SelectItem value="new" className="text-muted-foreground">
              (새로 만들기)
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button onClick={() => setEditingItemId("new")}>새로 만들기</Button>
    </div>
  );
}

function ItemThumbnail() {
  const { editingItem } = useEditItem();

  return (
    <div className="w-full aspect-video bg-muted rounded-lg">
      {editingItem.item?.thumbnailImage ? (
        <img
          src={editingItem.item?.thumbnailImage}
          className="rounded-lg"
          alt=""
        />
      ) : (
        <Skeleton className="w-full h-full rounded-lg" />
      )}
    </div>
  );
}

function ItemForm() {
  return (
    <div className="max-w-[720px] w-full m-auto flex flex-col gap-1">
      <ItemFormInput name="id" />
      <ItemFormInput name="name" />
      <ItemFormTypeSelect />
      <ItemFormTextarea name="description" />
    </div>
  );
}

function ItemResult() {
  const { editingItem } = useEditItem();

  return (
    <div className="max-w-[720px] w-full m-auto mt-10 bg-muted p-2 rounded">
      <pre className="font-mono text-xs">
        {JSON.stringify(editingItem.item, null, 2)}
      </pre>
    </div>
  );
}

export function WritePage() {
  return (
    <>
      <MainHeader />
      <div className="max-w-[900px] w-full px-4 mx-auto my-[90px] ">
        <SelectItemSection />
        <div className="flex flex-col gap-2 mt-2">
          <ItemThumbnail />
          <ItemForm />
          <ItemResult />
        </div>
      </div>
    </>
  );
}
