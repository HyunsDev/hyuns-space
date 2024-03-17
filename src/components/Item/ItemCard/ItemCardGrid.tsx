import { Item } from "@/data/items/item.type";
import { ItemCard, SeeAllCard } from "./ItemCard";

export function ItemCardGrid({
  items,
  variant,
  withSeeAllCard,
}: {
  items: Item[];
  variant?: "compact" | "default";
  withSeeAllCard?: boolean;
}) {
  return (
    <div
      className="grid gap-x-4 gap-y-10 justify-start"
      style={{
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, auto))",
      }}
    >
      {items.map((item) => (
        <ItemCard key={item.id} item={item} variant={variant} />
      ))}
      {withSeeAllCard && <SeeAllCard variant={variant} />}
    </div>
  );
}
