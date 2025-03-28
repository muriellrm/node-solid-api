import { PrismaGymsRepository } from "#/repositories/prisma/prisma-gyms-repository";
import { GetAllNearByGymsUseCase } from "../get-all-near-by-gyms";

export const makeGetAllNearByGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const getAllNearByGymsUseCase = new GetAllNearByGymsUseCase(gymsRepository);

  return getAllNearByGymsUseCase;
};
