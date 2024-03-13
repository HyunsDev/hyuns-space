import { Item } from "@/data/items/item.type";
import { cn } from "@/libs/utils";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { itemTypeText } from "@/utils/itemTypeText";
import { ItemBadge } from "../ItemBadge/ItemBadge";
import { useTheme } from "@/components/themeProvider";

export function ItemCard({
  item,
  className,
  variant = "default",
}: {
  item: Item;
  className?: string;
  variant?: "default" | "compact";
}) {
  const { currentTheme } = useTheme();

  return (
    <Link to={`/items/${item.id}`}>
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className={cn(
          "relative w-full max-w-full md:max-w-[300px] rounded-lg",
          currentTheme === "dark"
            ? "bg-[rgba(255,255,255,0.1)]"
            : "bg-[rgba(255,255,255,0.9)] border",
          variant === "compact" ? "aspect-square" : "aspect-[3/4]",
          className
        )}
      >
        <div className="w-full aspect-video rounded-t-lg">
          <img
            src={item.thumbnailImage || `/items/${item.id}/thumbnail.png`}
            alt={`${item.name} 썸네일`}
            className="rounded-t-lg"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-1 mt-2">
          {item.logoImage && (
            <img
              src={item.logoImage}
              alt={`${item.name} 로고`}
              className="size-6 rounded"
            />
          )}
          <div className="font-medium">{item.name}</div>
        </div>

        <div className="px-4 py-1 text-sm text-gray-400">
          {item.description}
        </div>

        <div className="absolute right-2 top-2 flex items-center gap-1">
          {item.badges?.map((badge, index) => (
            <ItemBadge key={index} badge={badge} />
          ))}
        </div>

        <div
          className={cn(
            "absolute left-0 bottom-0 border-t h-[32px] w-full px-4",
            currentTheme === "dark"
              ? "border-[rgba(255,255,255,0.1)]"
              : "border-border"
          )}
        >
          <div className="w-full h-full flex justify-between items-center">
            <div className="text-xs text-gray-500">
              {itemTypeText(item.type)}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
