import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "#/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
    vi.useFakeTimers();
  });
  afterEach(async () => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "123456",
      userId: "123456",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in a day", async () => {
    vi.setSystemTime(new Date(2025, 2, 18, 8, 0, 0));
    await sut.execute({
      gymId: "123456",
      userId: "123456",
    });

    await expect(
      sut.execute({ gymId: "123456", userId: "123456" })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2025, 2, 18));

    await sut.execute({
      gymId: "123456",
      userId: "123456",
    });

    vi.setSystemTime(new Date(2025, 2, 19));

    const { checkIn } = await sut.execute({
      gymId: "123456",
      userId: "123456",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
