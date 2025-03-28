import type { Gym, Prisma } from "@prisma/client";
import type { FindAllNearByParams, GymsRepository } from "../gyms-repository";
import { prisma } from "#/lib/prisma";

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    return await prisma.gym.findUnique({
      where: {
        id,
      },
    });
  }
  async create(data: Prisma.GymCreateInput) {
    return await prisma.gym.create({ data });
  }
  async findAll(query: string, page: number) {
    const take = 20;
    const skip = (page - 1) * take;

    return await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take,
      skip,
    });
  }
  async findAllNearBy({ latitude, longitude }: FindAllNearByParams) {
    return await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;    
  }
}
