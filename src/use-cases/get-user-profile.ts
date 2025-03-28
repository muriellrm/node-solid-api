import type { UsersRepository } from "#/repositories/users-repository";
import type { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { ensurePromiseOrThrow } from "#/utils/ensure-promise";

interface GetUserProfileRequest {
  userId: string;
}
interface GetUserProfileResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {

    const user = await ensurePromiseOrThrow({
      promise: this.usersRepository.findById(userId),
      error: ResourceNotFoundError,
    });

    return {
      user,
    };
  }
}
