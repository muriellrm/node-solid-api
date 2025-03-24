import type { CheckInsRepository } from "#/repositories/check-ins-repository";
import type { GymsRepository } from "#/repositories/gyms-repository";
import type { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCoordinates } from "#/utils/get-distance-between-coordinates";
import { ensurePromiseOrThrow, ensurePromiseThrow } from "#/utils/ensure-promise";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxCheckInExceededError } from "./errors/max-check-in-exceeded-error";

interface CheckInRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}
interface CheckInResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository
  ) {}
  private MAX_DISTANCE_IN_KILOMETERS = 0.1;

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInRequest): Promise<CheckInResponse> {

    const gym = await ensurePromiseOrThrow({
      promise: this.gymsRepository.findById(gymId),
      error: ResourceNotFoundError,
    });

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    if (distance > this.MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError();
    }
   
    await ensurePromiseThrow({
      promise: this.checkInsRepository.findByUserIdOnDate(
        userId,
        new Date()
      ),
      error: MaxCheckInExceededError,
    });
      
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
