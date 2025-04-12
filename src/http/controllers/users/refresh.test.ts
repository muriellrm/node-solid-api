import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";

describe("[Users] - Refresh Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to refresh a token", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie") || [];

    const sut = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(sut.status).toEqual(200);
    expect(sut.body).toEqual({
      token: expect.any(String),
    });
    expect(sut.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
