import { ItemType } from "@/data/items/item.type";

export const itemTypeText = (type: ItemType) => {
  switch (type) {
    case "project":
      return "프로젝트";
    case "activity":
      return "활동";
    case "team":
      return "팀";
    case "repository":
      return "레포";
    case "design":
      return "디자인";
    default:
      return "";
  }
};
