export class CheckInTimeExceededError extends Error {
  constructor() {
    super("Check in time exceeded 20 minutes of its creation!");
  }
}
