import { beforeEach, describe, expect, it } from "vitest";

import { InMemoryCheckInsRepository } from "#/repositories/in-memory/in-memory-check-ins-repository";
import { GetAllUserCheckInsHistoryUseCase } from "./get-all-user-check-ins-history";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetAllUserCheckInsHistoryUseCase;

describe("Get All User Check-Ins History Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetAllUserCheckInsHistoryUseCase(checkInsRepository);
  });

  it("should be able to get all user check-ins' history", async () => {
    for (let i = 1; i <= 2; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${String(i).padStart(2, "0")}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-01",
      }),
      expect.objectContaining({
        gym_id: "gym-02",
      }),
    ]);
  });

  it("should be able to get all paginated check-ins' history", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${String(i).padStart(2, "0")}`,
        user_id: "user-01",
      });
    }

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: "gym-21",
      }),
      expect.objectContaining({
        gym_id: "gym-22",
      }),
    ]);
  });
});
