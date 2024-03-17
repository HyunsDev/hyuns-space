export type ItemType = "project" | "develop" | "activity" | "design";
export const itemTypes: ItemType[] = [
  "project",
  "develop",
  "design",
  "activity",
];
export const itemTypeMap: Record<ItemType, string> = {
  project: "프로젝트",
  develop: "개발",
  design: "디자인",
  activity: "활동",
};
