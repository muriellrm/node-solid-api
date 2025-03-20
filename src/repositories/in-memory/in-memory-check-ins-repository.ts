import type { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import type { CheckInsRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = [];

  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      created_at: new Date(),
      id: randomUUID(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");  
    const endOfTheDay = dayjs(date).endOf("date");  

    const checkInOnSameDate = this.items.find(
      (item) => {
        const checkInDate = dayjs(date);
        const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
        return item.user_id === userId && isOnSameDate;
      }
    );

    if (!checkInOnSameDate) {
      return null;
    }
    return checkInOnSameDate;
  }
}
