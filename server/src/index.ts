import Koa from "koa";
import { itemRouter } from "./routers/item.router";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(itemRouter.routes());
app.use(itemRouter.allowedMethods());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
