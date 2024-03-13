import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/header/MainHeader";
import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ItemType } from "@/data/items/item.type";
import { useItems } from "@/hooks/useItems";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

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
              <ToggleGroupItem value="project">프로젝트</ToggleGroupItem>
              <ToggleGroupItem value="repository">레포지토리</ToggleGroupItem>
              <ToggleGroupItem value="activity">활동</ToggleGroupItem>
              <ToggleGroupItem value="team">팀</ToggleGroupItem>
            </ToggleGroup>
            <Button variant="ghost" className="flex gap-1 items-center" asChild>
              <Link to="items">
                모두 보기 <ArrowRightIcon />
              </Link>
            </Button>
          </div>
          <ItemCardGrid items={items} />
        </div>
      </PageContainer>
    </>
  );
}
