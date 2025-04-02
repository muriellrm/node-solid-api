import { makeGetAllNearByGymsUseCase } from "#/use-cases/factories/make-get-all-near-by-gyms-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const nearBy: RouteHandlerMethod = async (request, reply) => {
  const querySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  });

  const { latitude, longitude } = querySchema.parse(request.query);

  const getAllNeaByUseCase = makeGetAllNearByGymsUseCase();
  const { gyms } = await getAllNeaByUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
};
