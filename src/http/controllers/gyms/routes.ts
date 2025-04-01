import { verifyJwt } from "#/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook("onRequest", verifyJwt);
  
};
