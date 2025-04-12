import type { Role } from "@prisma/client";
import type { RouteHandlerMethod } from "fastify";

type UserRole = keyof typeof Role;

export const verifyUserRole = (userRole: UserRole): RouteHandlerMethod => {
  return async (request, reply) => {
    const { role } = request.user;
    if (role !== userRole) {
      return reply.status(403).send({ message: "Access denied." });
    }
  };
};
