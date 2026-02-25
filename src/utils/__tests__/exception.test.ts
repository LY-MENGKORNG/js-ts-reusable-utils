import { describe, expect, it } from "bun:test";
import { tryAsyncCatch, trySyncCatch } from "../exception";
import { fetchHorses, FetchHorsesError, type Horse } from "../helper";

describe("▄︻デ══━一💥 Exception handling", () => {
  describe("⏳ Asynchronous handling", () => {
    it("📜 Should set the error message in response when fetching horses fails", async () => {
      const { data, err } = await tryAsyncCatch(fetchHorses({ error: true }));

      expect(data).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err!.message).toBe("Failed to fetch horses");
    });

    it("🎉 Should accept both of promise and promise function argument", async () => {
      const { data, err } = await tryAsyncCatch(fetchHorses()); // promise
      const { data: data2, err: err2 } = await tryAsyncCatch(fetchHorses); // function that return promise

      expect(data).toHaveLength(3);
      expect(err).toBeNull();

      expect(data2).toHaveLength(3);
      expect(err2).toBeNull();
    });

    it("🦾 Should handle errors in promise function argument", async () => {
      const { data, err } = await tryAsyncCatch(fetchHorses({ error: true }));

      expect(data).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err!.message).toBe("Failed to fetch horses");
    });

    it("🤞 Should handle errors in promise argument", async () => {
      const { data, err } = await tryAsyncCatch(fetchHorses({ error: true }));

      expect(data).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err!.message).toBe("Failed to fetch horses");
    });

    it("🪄 Should handle errors with the provided custom types", async () => {
      const { data, err } = await tryAsyncCatch<Horse[], FetchHorsesError>(
        fetchHorses({ error: true }),
      );

      expect(data).toBeNull();
      expect(err).toBeInstanceOf(FetchHorsesError);
      expect(err!.message).toBe("Failed to fetch horses");
    });
  });
  describe("💫 Synchronous handling", () => {
    it("🤾 Should handle errors correctly", () => {
      const { data, err } = trySyncCatch(() =>
        JSON.parse("You are shooting yourself in the foot!")
      );

      expect(data).toBeNull();
      expect(err).toBeInstanceOf(Error);
      expect(err!.message).toBe(
        'JSON Parse error: Unexpected identifier "You"',
      );
    });

    it("🪄 Should set expected result to response correctly", () => {
      const { data, err } = trySyncCatch(() => JSON.parse('{"msg": "hi mom"}'));
      expect(data).toEqual({ msg: "hi mom" });
      expect(err).toBeNull();
    });
  });
});
