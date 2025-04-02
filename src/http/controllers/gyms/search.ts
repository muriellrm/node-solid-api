import { makeSearchGymsUseCase } from "#/use-cases/factories/make-search-gyms-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const search: RouteHandlerMethod = async (request, reply) => {
  const querySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = querySchema.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();
  const { gyms } = await searchGymsUseCase.execute({
    page,
    query,
  });

  return reply.status(200).send({ gyms });
};
