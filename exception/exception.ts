/**
 * A utility function to handle errors in asynchronous operations.
 * It accepts either a promise or a function that returns a promise ({@link Thunk<T>}),
 * and returns an object containing either the resolved data or the error ({@link Result<T, E>}).
 *
 * @param thunk Either a promise or a function that returns a promise.
 * @returns {Promise<Result<T, E>>} An object containing either the resolved data or the error.
 */
export async function tryCatch<T, E = Error>(
  thunk: Thunk<T>,
): Promise<Result<T, E>> {
  if (thunk instanceof Function) {
    thunk = thunk();
  }

  return thunk
    .then((data) => ({ data, err: null }))
    .catch((err: E) => ({ data: null, err }));
}
