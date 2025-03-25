import type { GymsRepository } from "#/repositories/gyms-repository";
import type { Gym } from "@prisma/client";

interface SearchGymsRequest {
  query: string;
  page: number;
}
interface SearchGymsResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsRequest): Promise<SearchGymsResponse> {
    const gyms = await this.gymsRepository.findAll(query, page);

    return {
      gyms,
    };
  }
}
