export type ItemType = "product" | "code" | "content" | "activity";
export const itemTypes: ItemType[] = ["product", "code", "content", "activity"];
export const itemTypeMap: Record<ItemType, string> = {
  product: "Product/Service",
  code: "Code/Package",
  content: "Content",
  activity: "Activity",
};
