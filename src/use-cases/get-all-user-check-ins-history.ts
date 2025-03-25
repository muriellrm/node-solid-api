import type { CheckInsRepository } from "#/repositories/check-ins-repository";
import type { CheckIn } from "@prisma/client";

interface GetAllUserCheckInsHistoryRequest {
  userId: string;
  page: number;
}
interface GetAllUserCheckInsHistoryResponse {
  checkIns: CheckIn[];
}

export class GetAllUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page
  }: GetAllUserCheckInsHistoryRequest): Promise<GetAllUserCheckInsHistoryResponse> {
    const checkIns = await this.checkInsRepository.findAllByUserId(userId, page);
    return { checkIns };
  }
}
