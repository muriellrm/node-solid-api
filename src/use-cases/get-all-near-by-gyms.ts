import type { GymsRepository } from "#/repositories/gyms-repository";
import type { Gym } from "@prisma/client";

interface GetAllNearByGymsRequest {
  userLatitude: number;
  userLongitude: number;
}
interface GetAllNearByGymsResponse {
  gyms: Gym[];
}

export class GetAllNearByGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetAllNearByGymsRequest): Promise<GetAllNearByGymsResponse> {
    const gyms = await this.gymsRepository.findAllNearBy({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return {
      gyms,
    };
  }
}
