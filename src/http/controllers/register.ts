import { prisma } from "#/lib/prisma";
import { registerUseCase } from "#/use-cases/register";
import { hash } from "bcryptjs";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const register: RouteHandlerMethod = async (request, reply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const requestBody = bodySchema.parse(request.body);

  try {
    await registerUseCase(requestBody);
  } catch {
    return reply.status(409).send();
  }

  return reply.status(201).send();
};
