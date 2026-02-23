type Success<T> = { data: T; err: null };
type Failure<E> = { data: null; err: E };
type Thunk<T> = Promise<T> | (() => Promise<T>);

type Result<T, E> = Success<T> | Failure<E>;
