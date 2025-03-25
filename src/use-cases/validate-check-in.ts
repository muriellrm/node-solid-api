import type { CheckInsRepository } from "#/repositories/check-ins-repository";
import { ensurePromiseOrThrow } from "#/utils/ensure-promise";
import type { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckInRequest {
  checkInId: string;
}
interface ValidateCheckInResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await ensurePromiseOrThrow({
      promise: this.checkInsRepository.findById(checkInId),
      error: ResourceNotFoundError,
    });

    const updatedCheckIn = await this.checkInsRepository.save({
      ...checkIn,
      validated_at: new Date(),
    });

    return {
      checkIn: updatedCheckIn,
    };
  }
}
