import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ItemType, itemTypeMap, itemTypes } from "@/data/items/item.type";
import { useItems } from "@/hooks/useItems";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export function MainPreviewSection() {
  const [type, setType] = useState<ItemType>("project");
  const { items } = useItems({
    type: type,
    limit: 5,
  });

  return (
    <div className="max-w-max-screen w-full px-4 md:px-8 m-auto mt-[200px] space-y-4">
      <div className="text-2xl font-bold">모든 아이템</div>
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
        <Button variant="ghost" className="flex gap-1 items-center" asChild>
          <Link to="items">
            모두 보기 <ArrowRightIcon />
          </Link>
        </Button>
      </div>
      <ItemCardGrid items={items} variant="compact" withSeeAllCard />
    </div>
  );
}
