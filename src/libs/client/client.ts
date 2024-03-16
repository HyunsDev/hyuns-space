import { EndpointClient } from "endpoint-client";
import {
  GetItem,
  GetItems,
  GetRoot,
  PostItems,
} from "./endpoint/items.endpoint";

export class Client extends EndpointClient {
  readonly GetRoot = this.endpointBuilder(GetRoot);
  readonly GetItems = this.endpointBuilder(GetItems);
  readonly PostItems = this.endpointBuilder(PostItems);
  readonly GetItem = this.endpointBuilder(GetItem);
}
