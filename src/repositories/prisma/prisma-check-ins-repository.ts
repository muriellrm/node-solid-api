import type { Prisma, CheckIn } from "@prisma/client";
import type { CheckInsRepository } from "../check-ins-repository";
import { prisma } from "#/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    return await prisma.checkIn.create({ data });
  }
  async findById(id: string) {
    return await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });
  }
  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    return await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        }
      }
    })
  }
  async findAllByUserId(userId: string, page: number) {
    const take = 20;
    const skip = (page - 1) * take;

    return await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take,
      skip
    });
  }
  async countByUserId(userId: string) {
    return await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });
  }
  async save(data: CheckIn) {
    return prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });
  }
}
