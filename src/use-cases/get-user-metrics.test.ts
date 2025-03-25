import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "#/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get user check-ins count from metrics", async () => {
    for (let i = 1; i <= 2; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${String(i).padStart(2, "0")}`,
        user_id: "user-01",
      });
    }

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toBe(2);
  });
});
