import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";

describe("Profile Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to get user profile", async () => {
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

    const sut = await request(app.server)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: "example@example.com",
      })
    );
  });
});
