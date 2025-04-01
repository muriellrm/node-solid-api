import { makeGetUserProfileUseCase } from "#/use-cases/factories/make-get-user-profile-use-case";
import type { RouteHandlerMethod } from "fastify";

export const profile: RouteHandlerMethod = async (request, reply) => {
  const getUserProfile = makeGetUserProfileUseCase();
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });
  const { password_hash, ...userWithoutToken } = user;

  return reply.status(200).send({ ...userWithoutToken });
};
