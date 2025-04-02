import { makeGetUserMetricsUseCase } from "#/use-cases/factories/make-get-user-metrics-use-case";
import type { RouteHandlerMethod } from "fastify";

export const metrics: RouteHandlerMethod = async (request, reply) => {
  const getUserMetricsUseCase = makeGetUserMetricsUseCase();
  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkInsCount });
};
