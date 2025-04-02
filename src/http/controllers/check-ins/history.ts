import { makeGetAllUserCheckInsHistoryUseCase } from "#/use-cases/factories/make-get-all-user-check-ins-history-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const history: RouteHandlerMethod = async (request, reply) => {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = querySchema.parse(request.query);

  const getAllUserCheckInsHistoryUseCase =
    makeGetAllUserCheckInsHistoryUseCase();
  const { checkIns } = await getAllUserCheckInsHistoryUseCase.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ checkIns });
};
