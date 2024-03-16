/* eslint-disable @typescript-eslint/no-explicit-any */
import Router from "koa-router";
import fsPromise from "fs/promises";
import path from "path";

export const itemRouter = new Router();

itemRouter.get("/", (ctx) => {
  ctx.body = {
    code: "Hello, World!",
  };
});

itemRouter.get("/items", async (ctx) => {
  const file = await fsPromise.readFile(
    path.join(__dirname, "../../../src/data/items/data.json"),
    "utf-8"
  );
  ctx.body = {
    items: JSON.parse(file),
  };
});

itemRouter.post("/items", async (ctx) => {
  const data = (ctx.request as any)?.body?.items;
  await fsPromise.writeFile(
    path.join(__dirname, "../../../src/data/items/data.json"),
    JSON.stringify(data, null, 2)
  );
  ctx.body = {
    items: data,
  };
});

itemRouter.get("/items/:itemId", async (ctx) => {
  const itemId = ctx.params.itemId;

  const file = await fsPromise.readFile(
    path.join(__dirname, "../../../src/data/items/data.json"),
    "utf-8"
  );
  const items = JSON.parse(file);
  const item = items.find((item: any) => item.id === itemId);

  const files = await fsPromise.readdir(
    path.join(__dirname, `../../../public/items`, itemId)
  );

  ctx.body = {
    item,
    files,
  };
});
