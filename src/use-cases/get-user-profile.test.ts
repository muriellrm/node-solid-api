import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "#/repositories/in-memory/in-memory-users-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { GetUserProfile } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe("Get User Profile Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfile(usersRepository);
  });

  it("should be able get user profile", async () => {
    const { id: userId } = await usersRepository.create({
      email: "example@example.com",
      name: "Example Name",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({ userId });

    expect(user.id).toEqual(userId);
  });

  it("should not be able get user profile with wrong id", async () => {
    await expect(
      sut.execute({ userId: "non-existent-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
