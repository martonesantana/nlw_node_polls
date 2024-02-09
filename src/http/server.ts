import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import cookie from "@fastify/cookie";
import websocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";

const app = fastify();

app.register(cookie, {
  secret: "0c5296ee-d3d0-498c-b1dc-1e4d09970512", // for cookies signature
  hook: "onRequest", // for cookies encryption
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});
