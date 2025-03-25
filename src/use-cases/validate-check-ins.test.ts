import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "#/repositories/in-memory/in-memory-check-ins-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CheckInTimeExceededError } from "./errors/check-in-time-exceeded-error";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
  });

  it("should be to validate an existent check in", async () => {
    const { id } = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({ checkInId: id });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be to validate a non-existent check in", async () => {
    await expect(
      sut.execute({ checkInId: "non-existent-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be to validate the check in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2025, 0, 1));

    const { id } = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21;
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

    await expect(sut.execute({ checkInId: id })).rejects.toBeInstanceOf(
      CheckInTimeExceededError
    );
  });
});
