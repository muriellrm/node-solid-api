import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { InMemoryCheckInsRepository } from "#/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "#/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxCheckInExceededError } from "./errors/max-check-in-exceeded-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      description: null,
      id: "gym-01",
      phone: null,
      title: "Testing Gym",
      latitude: -28.2332516,
      longitude: -48.6593139,
    });

    vi.useFakeTimers();
  });
  afterEach(async () => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.2332516,
      userLongitude: -48.6593139,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in a day", async () => {
    vi.setSystemTime(new Date(2025, 2, 18, 8, 0, 0));
    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.2332516,
      userLongitude: -48.6593139,
    });

    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -28.2332516,
        userLongitude: -48.6593139,
      })
    ).rejects.toBeInstanceOf(MaxCheckInExceededError);
  });

  it("should be able to check in different days", async () => {
    vi.setSystemTime(new Date(2025, 2, 18));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.2332516,
      userLongitude: -48.6593139,
    });

    vi.setSystemTime(new Date(2025, 2, 19));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: -28.2332516,
      userLongitude: -48.6593139,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in a distant gym", async () => {
    gymsRepository.items.push({
      description: "",
      id: "gym-02",
      phone: "",
      title: "Testing Gym",
      latitude: new Decimal(-28.2467432),
      longitude: new Decimal(-48.6664062),
    });

    await expect(
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: -28.2332516,
        userLongitude: -48.6593139,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
