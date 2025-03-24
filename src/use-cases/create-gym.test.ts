import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "#/repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      description: "Node solid api",
      title: "JavaScript Gym",
      latitude: 0,
      longitude: 0,
      phone: "999123456",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
