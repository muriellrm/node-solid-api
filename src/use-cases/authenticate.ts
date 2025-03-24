import type { UsersRepository } from "#/repositories/users-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import type { User } from "@prisma/client";
import { ensurePromiseOrThrow } from "#/utils/ensure-promise";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

    const user = await ensurePromiseOrThrow({
      promise: this.usersRepository.findByEmail(email),
      error: InvalidCredentialsError,
    });

    await ensurePromiseOrThrow({
      promise: compare(password, user.password_hash),
      error: InvalidCredentialsError,
    });

    return {
      user,
    };
  }
}
