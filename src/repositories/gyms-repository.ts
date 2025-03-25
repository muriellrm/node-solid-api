import type { Gym, Prisma } from "@prisma/client";

export interface FindAllNearByParams {
  latitude: number;
  longitude: number;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findAll(query: string, page: number): Promise<Gym[]>;
  findAllNearBy(params: FindAllNearByParams): Promise<Gym[]>;
}
