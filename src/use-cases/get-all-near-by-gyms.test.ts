import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "#/repositories/in-memory/in-memory-gyms-repository";
import { GetAllNearByGymsUseCase } from "./get-all-near-by-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: GetAllNearByGymsUseCase;

describe("Get All Near By Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GetAllNearByGymsUseCase(gymsRepository);
  });

  it("should be able to search gyms", async () => {
    await gymsRepository.create({
      description: null,
      id: "gym-01",
      phone: null,
      title: "Javascript Gym",
      latitude: -28.2332516,
      longitude: -48.6593139,
    });

    await gymsRepository.create({
      description: null,
      id: "gym-02",
      phone: null,
      title: "Typescript Gym",
      latitude: -28.2332516,
      longitude: -48.6593139,
    });

    await gymsRepository.create({
      description: null,
      id: "gym-03",
      phone: null,
      title: "Testing Gym",
      latitude: -27.9246618,
      longitude: -50.0961301,
    });

    const { gyms } = await sut.execute({
      userLatitude: -28.2332516,
      userLongitude: -48.6593139,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ id: "gym-01", title: "Javascript Gym" }),
      expect.objectContaining({ id: "gym-02", title: "Typescript Gym" }),
    ]);
  });
});
