import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ItemBadge } from "@/data/items/item.type";
import { cn } from "@/libs/utils";
import { itemBadgeText } from "@/utils/itemBadgeText";

type ItemBadgeBaseProps = {
  size: string;
  tooltip: string;
  children: React.ReactNode;
  className?: string;
};
function ItemBadgeBase({
  size,
  tooltip,
  children,
  className,
}: ItemBadgeBaseProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "text font-bold py-1 px-2 rounded-full flex justify-center items-center cursor-default",
            className
          )}
          style={{
            height: size,
            width: size,
          }}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export type BadgeProps = {
  size: string;
};
function IsHotItemsBadge({ size }: BadgeProps) {
  const { text, tooltip } = itemBadgeText("isHot");
  return (
    <ItemBadgeBase
      size={size}
      className="bg-red-600 bg-opacity-20"
      tooltip={tooltip}
    >
      {text}
    </ItemBadgeBase>
  );
}

export function ItemBadge({
  badge,
  size = "32px",
}: {
  badge: ItemBadge;
  size?: string;
}) {
  switch (badge) {
    case "isHot":
      return <IsHotItemsBadge size={size} />;
    default:
      return null;
  }
}
