export type ItemType = "project" | "develop" | "activity" | "team" | "design";
export const itemTypes: ItemType[] = [
  "project",
  "develop",
  "design",
  "activity",
  "team",
];
export const itemTypeMap: Record<ItemType, string> = {
  project: "프로젝트",
  develop: "개발",
  design: "디자인",
  activity: "활동",
  team: "팀",
};

export type ItemBadge = "isHot" | "isNew";
export const itemBadges: ItemBadge[] = ["isHot", "isNew"];

export type ItemTag = "";
export const itemTags: ItemTag[] = [];

export type ItemLevel = 1 | 2 | 3 | 4 | 5;
export const itemLevelMap: Record<ItemLevel, string> = {
  1: "메인",
  2: "서브",
  3: "취미",
  4: "장난감",
  5: "쓰레기",
};

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  content?: string;
  thumbnailImage?: string;
  logoImage?: string;
  tags: ItemTag[];
  badges?: ItemBadge[];
  url?: string;
  urls?: string[];
  updatedAt: string;
  period: string;
  role?: string;
  stacks?: string[];
}
