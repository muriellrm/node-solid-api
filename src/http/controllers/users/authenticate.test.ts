import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";

describe("[Users] - Authenticate Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      email: "example@example.com",
      name: "Example Name",
      password: "123456",
    });

    const sut = await request(app.server).post("/sessions").send({
      email: "example@example.com",
      password: "123456",
    });

    expect(sut.statusCode).toEqual(200);
    expect(sut.body).toEqual({
      token: expect.any(String),
    });
  });
});
