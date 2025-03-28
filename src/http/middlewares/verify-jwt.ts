import { makeGetUserProfileUseCase } from "#/use-cases/factories/make-get-user-profile-use-case";
import type { RouteHandlerMethod } from "fastify";

export const verifyJwt: RouteHandlerMethod = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(401).send({ message: "Unauthorized" });
  }
};
