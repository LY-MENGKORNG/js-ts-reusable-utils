import { trySyncCatch } from "./exception";

type FnArg = (...args: any[]) => any | Promise<any>;
type Callback<F extends FnArg, E = Error> = ((
  ...args: Parameters<F>
) => Promise<Result<Awaited<ReturnType<F>>, E>>) & {
  cancel: () => void;
};

export function debounce<F extends FnArg, E = Error>(
  fn: F,
  delay: number,
): Callback<F, E> {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<F> | null = null;
  let pending: Array<(r: Result<Awaited<ReturnType<F>>, E>) => void> = [];

  const cancelledResult = (): Result<Awaited<ReturnType<F>>, E> =>
    ({
      data: null,
      err: new Error("Debounced call cancelled") as unknown as E,
    }) as Result<Awaited<ReturnType<F>>, E>;

  async function invokeWithArgs(
    args: Parameters<F>,
  ): Promise<Result<Awaited<ReturnType<F>>, E>> {
    const { data, err } = trySyncCatch<ReturnType<F>, E>(() => fn(...args));
    if (err) return { data: null, err };

    try {
      const awaited = (await data) as Awaited<ReturnType<F>>;
      return { data: awaited, err: null };
    } catch (e) {
      return { data: null, err: e as E };
    }
  }

  const wrapped = ((...args: Parameters<F>) => {
    lastArgs = args;

    if (timer) clearTimeout(timer);

    const p = new Promise<Result<Awaited<ReturnType<F>>, E>>((resolve) => {
      pending.push(resolve);
    });

    timer = setTimeout(async () => {
      timer = null;
      const resolvers = pending;
      pending = [];

      const argsToUse = lastArgs!;
      lastArgs = null;

      const r = await invokeWithArgs(argsToUse);
      resolvers.forEach((resolve) => resolve(r));
    }, Math.max(0, delay));

    return p;
  }) as Callback<F, E>;

  wrapped.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;

    if (pending.length) {
      const r = cancelledResult();
      pending.forEach((resolve) => resolve(r));
      pending = [];
    }
  };

  return wrapped;
}
