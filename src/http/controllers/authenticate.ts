import { PrismaUsersRepository } from "#/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "#/use-cases/authenticate";
import { InvalidCredentialsError } from "#/use-cases/errors/invalid-credentials-error";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const authenticate: RouteHandlerMethod = async (request, reply) => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = bodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);
    await authenticateUseCase.execute({ email, password });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send();
};
