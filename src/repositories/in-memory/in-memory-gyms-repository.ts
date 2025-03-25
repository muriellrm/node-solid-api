import { Gym, Prisma } from "@prisma/client";
import type { GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(id: string): Promise<Gym | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id || randomUUID(),
      description: data.description || null,
      latitude: new Prisma.Decimal(data?.latitude?.toString()),
      longitude: new Prisma.Decimal(data?.longitude?.toString()),
      phone: data.phone || null,
      title: data.title,
    };

    this.items.push(gym);

    return gym;
  }

  async findAll(query: string, page: number) {
    const pageSize = 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    return this.items
      .filter((item) => item.title.includes(query))
      .slice(startIndex, endIndex);
  }
}
