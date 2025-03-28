import type { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJwt } from "./middlewares/verify-jwt";

export const appRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.get("/profile", { onRequest: [verifyJwt] }, profile);
};
