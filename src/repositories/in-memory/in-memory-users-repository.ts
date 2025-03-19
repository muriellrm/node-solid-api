import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create({ email, name, password_hash }: Prisma.UserCreateInput) {
    const user: User = {
      created_at: new Date(),
      email,
      id: randomUUID(),
      name,
      password_hash,
    };

    this.items.push(user);

    return user;
  }
  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null;
  }
}
