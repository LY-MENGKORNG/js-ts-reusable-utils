/**
 * A utility function to handle errors in asynchronous operations.
 * It accepts either a promise or a function that returns a promise ({@link Thunk<T>}),
 * and returns an object containing either the resolved data or the error ({@link Result<T, E>}).
 *
 * @param {Thunk<T>} thunk Either a promise or a function that returns a promise.
 * @returns {Promise<Result<T, E>>} An object containing either the resolved data or the error.
 *
 * @example
 * const { data, err } = await tryAsyncCatch(fetch("hi-mom")) // a promise
 * const { data, err } = await tryAsyncCatch(() => fetch("hi-mom")) // function that return promise
 */
export async function tryAsyncCatch<T, E = Error>(
  thunk: Thunk<T>,
): Promise<Result<T, E>> {
  if (thunk instanceof Function) {
    thunk = thunk();
  }

  return thunk
    .then((data) => ({ data, err: null }))
    .catch((err: E) => ({ data: null, err }));
}

/**
 * A utility function to handle errors in synchronous operations.
 * It accept a function that may throw unexpected error **(Because Javascript is crazy! and you are crazy too!)**
 *
 * @param {() => T} fn Function that can crash your system
 * @returns {Result<T, E>}
 *
 * @example
 * const { data, err } = trySyncCatch(() => JSON.parse("You're shooting yourself in the foot!"))
 */
export function trySyncCatch<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    return { data: fn(), err: null };
  } catch (err) {
    return { data: null, err: err as E };
  }
}
