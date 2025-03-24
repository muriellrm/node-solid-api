import type { UsersRepository } from "#/repositories/users-repository";
import type { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { ensurePromiseThrow } from "#/utils/ensure-promise";

interface UseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface UseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: UseCaseRequest): Promise<UseCaseResponse> {
    const password_hash = await hash(password, 6);
    
    await ensurePromiseThrow({
      promise: this.usersRepository.findByEmail(email),
      error: UserAlreadyExistsError,
    });
    
    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
