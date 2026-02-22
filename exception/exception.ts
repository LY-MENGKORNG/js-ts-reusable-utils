type Success<T> = {
  data: T;
  err: null;
};

type Failure<E> = {
  data: null;
  err: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

/**
 * The utility function that wraps asynchronous functions that may throw errors.
 * It returns a {@link Result} type which can either be a {@link Success} or an {@link Failure}.
 *
 * @param promise
 * @returns A promise that resolves to a {@link Result} type.
 * @example
 * const { data, err } = await tryCatch(fetch('https://example.com'));
 * if (err) {
 *   console.error(err.message); // err is typed as Error
 * } else {
 *   console.log(data); // data is typed as Response
 * }
 */
export async function tryCatch<T, E = Error>(
  promise: Promise<T> | (() => Promise<T>),
): Promise<Result<T, E>> {
  if (promise instanceof Function) {
    promise = promise();
  }
  return promise
    .then((data) => ({ data, err: null }))
    .catch((err: E) => ({ data: null, err }));
}
