import type { RouteHandlerMethod } from "fastify";

export const profile: RouteHandlerMethod = async (request, reply) => {
  await request.jwtVerify();  
  return reply.status(200).send();
};
