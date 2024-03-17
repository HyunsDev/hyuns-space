import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/share/header/MainHeader";
import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ItemType, itemTypeMap, itemTypes } from "@/data/items/item.type";
import { useItems } from "@/hooks/useItems";
import { useState } from "react";

export function ItemsPage() {
  const [type, setType] = useState<ItemType>("project");
  const { items } = useItems({
    type: type,
  });

  return (
    <>
      <MainHeader />
      <PageContainer>
        <div className="max-w-max-screen w-full px-4 md:px-8 m-auto mt-[100px] mb-[100px] space-y-4">
          <div className="flex justify-between gap-2">
            <ToggleGroup
              type="single"
              className="flex flex-wrap justify-start"
              value={type}
              onValueChange={(e) => setType(e as ItemType)}
            >
              {itemTypes.map((type) => (
                <ToggleGroupItem key={type} value={type}>
                  {itemTypeMap[type]}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <ItemCardGrid items={items} variant="compact" />
        </div>
      </PageContainer>
    </>
  );
}
