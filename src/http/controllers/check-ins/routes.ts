import { verifyJwt } from "#/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
};
