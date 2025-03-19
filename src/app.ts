import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();
app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {    

    return reply.status(400).send({
      message: "Validation error",
      issues: error.issues,
    });
  }

  // TODO: criar uma ferramenta externa de log para ambientes produtivos.
  if (env.NODE_ENV !== "production") console.error(error);

  return reply.status(500).send({ message: "Internal server error!" });
});
