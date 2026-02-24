// @ts-ignore
import { describe, expect, test } from "bun:test";
import { tryCatch } from "./asynchronous.ts";

type Horse = {
  id: number;
  name: string;
  slug: string;
};

class FetchHorsesError extends Error {
  override cause?: unknown;
  constructor(message: string) {
    super(message);
    this.name = "FetchHorsesError";
  }
}

async function fetchHorses({ error } = { error: false }): Promise<Horse[]> {
  if (error) throw new FetchHorsesError("Failed to fetch horses");

  return [
    { id: 1, name: "Unicorn", slug: "🦄" },
    { id: 2, name: "Pegasus", slug: "🐴" },
    { id: 3, name: "Centaur", slug: "🐐" },
  ];
}

describe("⏳ Asynchronous handling", () => {
  test("📜 Should set the error message in response when fetching horses fails", async () => {
    const { data, err } = await tryCatch(fetchHorses({ error: true }));

    expect(data).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe("Failed to fetch horses");
  });

  test("🎉 Should accept both of promise and promise function argument", async () => {
    const { data, err } = await tryCatch(fetchHorses()); // promise
    const { data: data2, err: err2 } = await tryCatch(fetchHorses); // function that return promise

    expect(data).toHaveLength(3);
    expect(err).toBeNull();

    expect(data2).toHaveLength(3);
    expect(err2).toBeNull();
  });

  test("🦾 Should handle errors in promise function argument", async () => {
    const { data, err } = await tryCatch(fetchHorses({ error: true }));

    expect(data).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe("Failed to fetch horses");
  });

  test("🤞 Should handle errors in promise argument", async () => {
    const { data, err } = await tryCatch(fetchHorses({ error: true }));

    expect(data).toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(err!.message).toBe("Failed to fetch horses");
  });

  test("🪄 Should handle errors with the provided custom types", async () => {
    const { data, err } = await tryCatch<Horse[], FetchHorsesError>(
      fetchHorses({ error: true }),
    );

    expect(data).toBeNull();
    expect(err).toBeInstanceOf(FetchHorsesError);
    expect(err!.message).toBe("Failed to fetch horses");
  });
});
