export class MaxCheckInExceededError extends Error {
  constructor() {
    super("Maximum number of check-ins exceeded!");
  }
}
