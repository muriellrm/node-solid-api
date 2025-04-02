import { verifyJwt } from "#/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { search } from "./search";
import { nearBy } from "./near-by";
import { create } from "./create";

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearBy);

  app.post("/gyms", create);
};
