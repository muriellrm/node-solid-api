import { prisma } from "#/lib/prisma";
import { hash } from "bcryptjs";
import type { FastifyInstance } from "fastify";
import request from "supertest";

interface Response {
  token: string;
}

export const createAndAuthenticateUser = async (
  app: FastifyInstance,
  isAdmin?: boolean
): Promise<Response> => {
  await prisma.user.create({
    data: {
      email: "example@example.com",
      name: "Example Name",
      password_hash: await hash("123456", 6),
      role: !!isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authenticate = await request(app.server).post("/sessions").send({
    email: "example@example.com",
    password: "123456",
  });
  const { token } = authenticate.body;
  return { token };
};
