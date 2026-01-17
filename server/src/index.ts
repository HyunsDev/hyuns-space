import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";

import { itemRouter } from "./routers/item.router";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(itemRouter.routes());
app.use(itemRouter.allowedMethods());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
