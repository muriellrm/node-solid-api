import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";

describe("[Users] - Register Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to register", async () => {
    const sut = await request(app.server).post("/users").send({
      email: "example@example.com",
      name: "Example Name",
      password: "123456",
    });

    expect(sut.statusCode).toEqual(201);
  });
});
