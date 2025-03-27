import { prisma } from "#/lib/prisma";
import type { Prisma, User } from "@prisma/client";
import type { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    });
  }
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
