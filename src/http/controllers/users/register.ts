import { UserAlreadyExistsError } from "#/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "#/use-cases/factories/make-register-use-case";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const register: RouteHandlerMethod = async (request, reply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, name, password } = bodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ email, name, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
};
