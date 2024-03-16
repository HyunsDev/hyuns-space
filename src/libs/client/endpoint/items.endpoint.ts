import { Item } from "@/data/items/item.type";
import { Endpoint } from "endpoint-client";

/**
 * GET /
 */
export const GetRoot: Endpoint<GetRootReq, GetRootRes> = {
  method: "GET",
  path: "/",
};
export type GetRootReq = Record<string, never>;
export type GetRootRes = {
  code: string;
};

/**
 * GET /items
 */
export const GetItems: Endpoint<GetItemsReq, GetItemsRes> = {
  method: "GET",
  path: "/items",
};
export type GetItemsReq = Record<string, never>;
export type GetItemsRes = {
  items: Item[];
};

/**
 * POST /items
 */
export const PostItems: Endpoint<PostItemsReq, PostItemsRes> = {
  method: "POST",
  path: "/items",
  bodyParams: ["items"],
};
export type PostItemsReq = {
  items: Item[];
};
export type PostItemsRes = {
  items: Item[];
};

/**
 * GET /items/:itemId
 */
export const GetItem: Endpoint<GetItemReq, GetItemRes> = {
  method: "GET",
  path: (e) => `/items/${e.itemId}`,
  pathParams: ["itemId"],
};
export type GetItemReq = {
  itemId: string;
};
export type GetItemRes = {
  item: Item;
  files: string[];
};
