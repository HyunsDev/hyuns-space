import { ItemCardGrid } from "@/components/Item/ItemCard/ItemCardGrid";
import { UseItemsOptions, useItems } from "@/hooks/useItems";
import { ReactNode } from "react";

export function CurationSection({
  condition,
  title,
  description,
}: {
  condition: UseItemsOptions;
  title: ReactNode;
  description?: ReactNode;
}) {
  const { items } = useItems(condition);

  return (
    <div className="max-w-max-screen w-full px-4 md:px-8 m-auto mt-[200px] space-y-4">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{title}</div>
          {description && <div className="text-gray-500">{description}</div>}
        </div>
      </div>
      <ItemCardGrid items={items} variant="compact" />
    </div>
  );
}
