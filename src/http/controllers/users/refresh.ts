import type { RouteHandlerMethod } from "fastify";

export const refresh: RouteHandlerMethod = async (request, reply) => {
  await request.jwtVerify({ onlyCookie: true });

  const { role, sub } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub,
        expiresIn: "7d",
      },
    }
  );

  return reply
    .setCookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token });
};
