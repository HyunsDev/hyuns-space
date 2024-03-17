import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  itemBadgeIconMap,
  type ItemBadge,
  itemBadgeTooltipMap,
} from "@/data/items/item.type";
import { cn } from "@/libs/utils";

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
  const icon = itemBadgeIconMap["isHot"];
  const tooltip = itemBadgeTooltipMap["isHot"];

  return (
    <ItemBadgeBase
      size={size}
      className="bg-red-600 bg-opacity-20"
      tooltip={tooltip}
    >
      {icon}
    </ItemBadgeBase>
  );
}
function IsNewItemsBadge({ size }: BadgeProps) {
  const icon = itemBadgeIconMap["isNew"];
  const tooltip = itemBadgeTooltipMap["isNew"];

  return (
    <ItemBadgeBase
      size={size}
      className="bg-blue-600 bg-opacity-20"
      tooltip={tooltip}
    >
      {icon}
    </ItemBadgeBase>
  );
}
function FoundedItemsBadge({ size }: BadgeProps) {
  const icon = itemBadgeIconMap["founded"];
  const tooltip = itemBadgeTooltipMap["founded"];

  return (
    <ItemBadgeBase
      size={size}
      className="bg-green-600 bg-opacity-20"
      tooltip={tooltip}
    >
      {icon}
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
    case "isNew":
      return <IsNewItemsBadge size={size} />;
    case "founded":
      return <FoundedItemsBadge size={size} />;
    default:
      return null;
  }
}
