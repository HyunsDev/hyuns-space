export type ItemType =
  | "project"
  | "repository"
  | "activity"
  | "team"
  | "design";
export type ItemBadge = "isHot" | "isNew";

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  description: string;
  content?: string;
  thumbnailImage?: string;
  logoImage?: string;
  tags: string[];
  badges?: ItemBadge[];
  url?: string;
  urls?: string[];
  updatedAt: string;
  period: string;
  role?: string;
}
