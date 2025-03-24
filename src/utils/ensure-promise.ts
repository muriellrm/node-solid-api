type ErrorProps = new (...args: any[]) => Error;

interface Props<T, E extends ErrorProps> {
  promise: Promise<T | null | undefined>;
  error: E;
}

export async function ensurePromiseOrThrow<T, E extends ErrorProps>({
  error: PromiseError,
  promise,
}: Props<T, E>): Promise<T> {
  const response = await promise;
  if (!response) {
    throw new PromiseError();
  }
  return response;
}

export async function ensurePromiseThrow<T, E extends ErrorProps>({
  error: PromiseError,
  promise,
}: Props<T, E>) {
  const response = await promise;
  if (response) {
    throw new PromiseError();
  }
  return;
}
