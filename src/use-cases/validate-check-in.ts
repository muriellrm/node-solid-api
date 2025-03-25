import type { CheckInsRepository } from "#/repositories/check-ins-repository";
import { ensurePromiseOrThrow } from "#/utils/ensure-promise";
import type { CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { CheckInTimeExceededError } from "./errors/check-in-time-exceeded-error";
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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );

    if (distanceInMinutesFromCheckInCreation > 10) {
      throw new CheckInTimeExceededError();
    }

    const updatedCheckIn = await this.checkInsRepository.save({
      ...checkIn,
      validated_at: new Date(),
    });

    return {
      checkIn: updatedCheckIn,
    };
  }
}
