import { prisma } from "#/lib/prisma";
import { PrismaUsersRepository } from "#/repositories/prisma/prisma-users-repository";
import type { UsersRepository } from "#/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface Request {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {    
  }

  async execute({ name, email, password }: Request) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({ name, email, password_hash });
  }
}
