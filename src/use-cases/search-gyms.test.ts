import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryGymsRepository } from "#/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
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

    const { gyms } = await sut.execute({
      page: 1,
      query: "Javascript",
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ id: "gym-01", title: "Javascript Gym" }),
    ]);
  });

  it("should be able to get paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        description: null,
        id: `gym-${String(i).padStart(2, "0")}`,
        phone: null,
        title: "Javascript Gym",
        latitude: -28.2332516,
        longitude: -48.6593139,
      });
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        id: "gym-21",
      }),
      expect.objectContaining({
        id: "gym-22",
      }),
    ]);
  });
});
