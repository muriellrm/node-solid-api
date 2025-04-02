import { makeValidateCheckInUseCase } from "#/use-cases/factories/make-validate-check-in-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const validate: RouteHandlerMethod = async (request, reply) => {
  const paramsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = paramsSchema.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();
  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
};
