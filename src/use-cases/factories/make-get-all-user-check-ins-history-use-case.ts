import { PrismaCheckInsRepository } from "#/repositories/prisma/prisma-check-ins-repository";
import { GetAllUserCheckInsHistoryUseCase } from "../get-all-user-check-ins-history";

export const makeGetAllUserCheckInsHistoryUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const getAllUserCheckInsHistoryUseCase = new GetAllUserCheckInsHistoryUseCase(checkInsRepository);

  return getAllUserCheckInsHistoryUseCase;
};
