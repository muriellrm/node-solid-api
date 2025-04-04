import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryUsersRepository } from "#/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
    
    // Creating user
    await usersRepository.create({
      email: "example@example.com",
      name: "Example Name",
      password_hash: await hash("123456", 6),
    });

  });

  it("should be able to authenticate", async () => {
    const { user } = await sut.execute({
      email: "example@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with nonexistent email", async () => {
    await expect(() =>
      sut.execute({
        email: "nonexistent@email.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  
  it("should not be able to authenticate with wrong password", async () => {  
    await expect(() =>
      sut.execute({
        email: "example@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

});
