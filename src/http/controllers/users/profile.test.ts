import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "#/app";
import { createAndAuthenticateUser } from "#/utils/test/create-and-authenticate-user";

describe("Profile Controller", () => {
  beforeEach(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to get user profile", async () => {
    const { token } = await createAndAuthenticateUser(app);

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
