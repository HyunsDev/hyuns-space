import { ItemBadge } from "@/components/Item/ItemBadge/ItemBadge";
import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { MainHeader } from "@/containers/header/MainHeader";
import { Item } from "@/data/items/item.type";
import { useItem } from "@/hooks/useItem";
import { useItems } from "@/hooks/useItems";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function PageThumbnail({ item }: { item: Item }) {
  return (
    <div className="max-w-[1000px] w-full aspect-video">
      <img
        src={item.thumbnailImage || `/items/${item.id}/thumbnail.png`}
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
      <div className="flex flex-col gap-2">
        <div className="text text-muted-foreground">{item.description}</div>
        <div className="flex flex-col gap-1 text-muted-foreground text-sm">
          <div className="flex justify-between">
            <span>활동기간</span>
            <span>{item.period}</span>
          </div>
          <div className="flex justify-between">
            <span>내용 업데이트</span>
            <span>{item.updatedAt}</span>
          </div>
          {item.role && (
            <div className="flex justify-between">
              <span>역할</span>
              <span>{item.role}</span>
            </div>
          )}
          {item.urls && (
            <div className="flex justify-between">
              <span>링크</span>
              <div className="flex flex-col items-end">
                {item.urls.map((url, index) => (
                  <a href={url} key={index} className="underline">
                    {url}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
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
    <div className="py-4">
      <div className="markdown">
        <Markdown rehypePlugins={[rehypeRaw]}>{item.content}</Markdown>
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
            <div className="flex flex-col w-full mt-[200px] lg:max-w-[300px] lg:mt-0 rounded-lg pb-[100px]">
              <ItemCardGrid
                items={items
                  .filter((i) => i.id !== item?.id)
                  .sort(() => Math.random() - 0.5)
                  .slice(0, 8)}
                variant="compact"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
