
import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify();

app.post("/users", async (request, reply)=>{
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  });

  const {password, ...rest} = bodySchema.parse(request.body);

  await prisma.user.create({
    data: {
      ...rest,
      password_hash: password
    }
  })

  return reply.status(201).send();
});
