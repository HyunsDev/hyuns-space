export type ItemBadge = "isHot" | "isNew" | "founded";
export const itemBadges: ItemBadge[] = ["isHot", "isNew", "founded"];
export const itemBadgeIconMap: Record<ItemBadge, string> = {
  isHot: "🔥",
  isNew: "🆕",
  founded: "🏢",
};
export const itemBadgeTooltipMap: Record<ItemBadge, string> = {
  isHot: "지금도 작업하고 있어요!",
  isNew: "새로 나왔어요!",
  founded: "창립했습니다!",
};
