import { prisma } from "#/lib/prisma";
import { hash } from "bcryptjs";
import type { RouteHandlerMethod } from "fastify";
import { z } from "zod";

export const register: RouteHandlerMethod = async (request, reply) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { password, email, name } = bodySchema.parse(request.body);
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      email, 
      name,
      password_hash,
    },
  });

  return reply.status(201).send();
};
