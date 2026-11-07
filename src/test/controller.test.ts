import { describe, expect, it, vi } from "vitest";
import {
  getAllCharacters,
  getCharacterById,
  getCharactersByFilm,
  getCharactersByTvShow,
} from "../controllers/DisneyCharacterController";

function lastRequestedUrl(): URL {
  return new URL(String(vi.mocked(fetch).mock.lastCall?.[0]));
}

describe("getAllCharacters", () => {
  it("leaves name out of the request when it is empty", async () => {
    await getAllCharacters(2);

    expect(lastRequestedUrl().search).toBe("?page=2");
  });

  it("sends name when it is given", async () => {
    await getAllCharacters(1, "Mickey");

    expect(lastRequestedUrl().searchParams.get("name")).toBe("Mickey");
  });

  it("returns an array even when the API returns one character as an object", async () => {
    const response = await getAllCharacters(1, "Mickey");

    expect(response?.data.map((character) => character.name)).toEqual(["Mickey Mouse"]);
  });

  it("returns null when the API answers with an error", async () => {
    // "(" is an invalid regular expression, which the API answers with a 500
    expect(await getAllCharacters(1, "(")).toBeNull();
  });

  it("returns null when the request fails", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));

    expect(await getAllCharacters()).toBeNull();
  });
});

describe("getCharactersByFilm", () => {
  it("finds a title with regular expression characters in it", async () => {
    const response = await getCharactersByFilm("Hercules (film)");

    expect(response?.data.map((character) => character.name)).toEqual(["Achilles"]);
  });

  it("matches the exact title, not titles that contain it", async () => {
    const response = await getCharactersByFilm("Fantasia");

    expect(response?.data.map((character) => character.name)).not.toContain("Fantasia 2000 Extra");
  });

  it("sends the requested page", async () => {
    await getCharactersByFilm("Fantasia", 2);

    expect(lastRequestedUrl().searchParams.get("page")).toBe("2");
  });
});

describe("getCharactersByTvShow", () => {
  it("sends the show as the tvShows parameter, escaped and anchored", async () => {
    await getCharactersByTvShow("Hercules (TV series)");

    expect(lastRequestedUrl().searchParams.get("tvShows")).toBe("^Hercules \\(TV series\\)$");
  });

  it("finds the characters of a show", async () => {
    const response = await getCharactersByTvShow("Hercules (TV series)");

    expect(response?.data.map((character) => character.name)).toContain("Achilles");
  });
});

describe("getCharacterById", () => {
  it("returns the character", async () => {
    const response = await getCharacterById(4703);

    expect(response?.data.name).toBe("Mickey Mouse");
  });

  it("returns null when the API answers with an array for an unknown id", async () => {
    expect(await getCharacterById(999999)).toBeNull();
  });
});
