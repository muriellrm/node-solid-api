import type { FastifyInstance } from "fastify";
import { verifyJwt } from "#/http/middlewares/verify-jwt";

import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { refresh } from "./refresh";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  
  app.patch("/token/refresh", refresh);

  app.get("/profile", { onRequest: [verifyJwt] }, profile);
};
