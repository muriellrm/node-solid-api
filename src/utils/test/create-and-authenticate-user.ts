import type { FastifyInstance } from "fastify";
import request from "supertest";

interface Response {
  token: string;
}

export const createAndAuthenticateUser = async (
  app: FastifyInstance
): Promise<Response> => {
  await request(app.server).post("/users").send({
    email: "example@example.com",
    name: "Example Name",
    password: "123456",
  });

  const authenticate = await request(app.server).post("/sessions").send({
    email: "example@example.com",
    password: "123456",
  });
  const { token } = authenticate.body;
  return { token };
};
