import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";
import { createAndAuthenticateUser } from "#/utils/test/create-and-authenticate-user";
import { prisma } from "#/lib/prisma";

describe("[Check-ins] - Create Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        description: "Test",
        phone: "11999999",
        title: "Testing Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      },
    });

    const sut = await request(app.server)
      .post("/check-ins")
      .set("Authorization", `Bearer ${token}`)
      .send({
        gymId: gym.id,
        latitude: -28.2332516,
        longitude: -48.6593139,
      });

    expect(sut.statusCode).toEqual(200);
    expect(sut.body.checkIn.id).toEqual(expect.any(String));
  });
});
