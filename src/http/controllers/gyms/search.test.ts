import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";
import { createAndAuthenticateUser } from "#/utils/test/create-and-authenticate-user";

describe("[Gyms] - Search Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to search a gym", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test",
        phone: "11999999",
        title: "Testing Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      });

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description: "Test",
        phone: "11999999",
        title: "JavaScript Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      });

    const sut = await request(app.server)
      .get("/gyms/search")
      .query({
        query: "JavaScript",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(sut.statusCode).toEqual(200);
    expect(sut.body.gyms).toHaveLength(1);
    expect(sut.body.gyms).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: "JavaScript Gym",
      }),
    ]);
  });
});
