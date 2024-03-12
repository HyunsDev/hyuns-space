import { ItemBadge } from "@/data/items/item.type";

export const itemBadgeText = (badge: ItemBadge) => {
  switch (badge) {
    case "isHot":
      return {
        text: "🔥",
        tooltip: "뜨겁습니다!",
      };
    case "isNew":
      return {
        text: "🆕",
        tooltip: "새로 나왔어요!",
      };
    default:
      return {
        text: "",
        tooltip: "",
      };
  }
};
