import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ItemType } from "@/data/items/item.type";
import { useEditItem } from "@/hooks/useEditItem";

export function ItemFormTypeSelect() {
  const { editingItem, setEditingItem } = useEditItem();

  const get = () => {
    return editingItem?.item?.type;
  };

  const edit = (value: ItemType) => {
    if (!editingItem.item) {
      return;
    }
    setEditingItem({
      ...editingItem,
      item: {
        ...editingItem.item,
        type: value,
      },
    });
  };

  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="w-[200px]">type</div>
      <Select value={get()} onValueChange={(e) => edit(e as ItemType)}>
        <SelectTrigger>
          <SelectValue placeholder="아이템을 선택해주세요" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="project">프로젝트</SelectItem>
          <SelectItem value="repository">레포지토리</SelectItem>
          <SelectItem value="activity">활동</SelectItem>
          <SelectItem value="team">팀</SelectItem>
          <SelectItem value="design">디자인</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
