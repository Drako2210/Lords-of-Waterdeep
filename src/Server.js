import { Server } from "boardgame.io/server";
import serve from "koa-static";
import { LordsOfWaterdeep } from "./LordsOfWaterdeep";

const server = Server({
  games: [LordsOfWaterdeep],
  origins: [/.*/],
});

server.app.use(serve("dist"));

server.run(process.env.PORT ?? 8000);
