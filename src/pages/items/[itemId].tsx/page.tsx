import { ItemBadge } from "@/components/Item/ItemBadge/ItemBadge";
import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/header/MainHeader";
import { Item } from "@/data/items/item.type";
import { useItem } from "@/hooks/useItem";
import { useItems } from "@/hooks/useItems";
import Markdown from "react-markdown";

function PageThumbnail({ item }: { item: Item }) {
  return (
    <div className="max-w-[1000px] w-full aspect-video">
      <img
        src={item.thumbnailImage}
        alt={`${item.name} 썸네일`}
        className="rounded-lg"
      />
    </div>
  );
}

function PageDescription({ item }: { item: Item }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {item.logoImage && (
          <img
            src={item.logoImage}
            alt={`${item.name} 로고`}
            className="size-12 rounded"
          />
        )}
        <div className="font-medium text-4xl">{item.name}</div>
      </div>
      <div className="text text-gray-400">{item.description}</div>
      <div className="flex gap-2">
        {item.badges?.map((badge, index) => (
          <ItemBadge key={index} badge={badge} />
        ))}
      </div>
    </div>
  );
}

function PageContent({ item }: { item: Item }) {
  return (
    <div className="">
      <div className="markdown">
        <Markdown>{item.content}</Markdown>
      </div>
    </div>
  );
}

export function ItemPage() {
  const { items } = useItems();
  const { item } = useItem();

  return (
    <>
      <MainHeader />
      <PageContainer>
        <div className="w-full px-4 mt-[72px] m-auto">
          <div className="w-fit gap-6 m-auto flex flex-col lg:flex-row">
            {item && (
              <div className="flex flex-col items-center lg:items-end">
                <PageThumbnail item={item} />
                <div className="max-w-[688px] my-10 w-full">
                  <PageDescription item={item} />
                  <PageContent item={item} />
                </div>
              </div>
            )}
            <div className="flex flex-col w-full mt-[200px] lg:max-w-[300px] lg:mt-0 rounded-lg">
              <ItemCardGrid
                items={items.filter((i) => i.id !== item?.id)}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
