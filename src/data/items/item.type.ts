import { ItemBadge } from "./types/itemBadge";
import { ItemTag } from "./types/itemTag";
import { ItemType } from "./types/itemType";

export * from "./types";
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
  curating?: string[];
  stacks?: string[];
}
