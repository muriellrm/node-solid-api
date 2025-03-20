import { compare } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "#/repositories/in-memory/in-memory-users-repository";
import { RegisterUseCase } from "./register";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      email: "example@example.com",
      name: "Example Name",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );
    expect(isPasswordCorrectlyHashed).toBeTruthy();
  });

  it("should not be able to register with the same email twice", async () => {
    const email = "example2@example.com";

    await sut.execute({
      email,
      name: "Example Name",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        email,
        name: "Example Name",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const email = "example2@example.com";

    const { user } = await sut.execute({
      email,
      name: "Example Name",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
