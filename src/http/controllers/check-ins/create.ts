import { makeCheckInUseCase } from "#/use-cases/factories/make-check-in-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const create: RouteHandlerMethod = async (request, reply) => {
  const bodySchema = z.object({
    gymId: z.string().uuid(),
    latitude: z.number().refine((value) => {
      Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude, gymId } = bodySchema.parse(request.body);

  const createCheckInUseCase = makeCheckInUseCase();
  const { checkIn } = await createCheckInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ checkIn });
};
