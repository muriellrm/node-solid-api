import { describe, expect, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";

import { RegisterUseCase } from "./register";
import type { UsersRepository } from "#/repositories/users-repository";
import { InMemoryUsersRepository } from "#/repositories/in-memory/in-memory-users-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRepository: UsersRepository;
let registerUseCase: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(userRepository);
  });

  it("should hash user password upon registration", async () => {
    const { user } = await registerUseCase.execute({
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

    await registerUseCase.execute({
      email,
      name: "Example Name",
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        email,
        name: "Example Name",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register", async () => {
    const email = "example2@example.com";

    const { user } = await registerUseCase.execute({
      email,
      name: "Example Name",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
