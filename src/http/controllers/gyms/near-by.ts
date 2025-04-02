import { makeGetAllNearByGymsUseCase } from "#/use-cases/factories/make-get-all-near-by-gyms-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const nearBy: RouteHandlerMethod = async (request, reply) => {
  const querySchema = z.object({
    userLatitude: z.number().refine((value) => {
      Math.abs(value) <= 90;
    }),
    userLongitude: z.number().refine((value) => {
      Math.abs(value) <= 180;
    }),
  });

  const { userLatitude, userLongitude } = querySchema.parse(request.query);

  const getAllNeaByUseCase = makeGetAllNearByGymsUseCase();
  const { gyms } = await getAllNeaByUseCase.execute({
    userLatitude,
    userLongitude,
  });

  return reply.status(200).send({ gyms });
};
