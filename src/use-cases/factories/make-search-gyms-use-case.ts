import { PrismaGymsRepository } from "#/repositories/prisma/prisma-gyms-repository";
import { PrismaUsersRepository } from "#/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";
import { SearchGymsUseCase } from "../search-gyms";

export const makeSearchGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const searchGymsUseCase = new SearchGymsUseCase(gymsRepository);

  return searchGymsUseCase;
};
