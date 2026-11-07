import characters from "../data/characters.json";
import mickeyMouse from "../data/mickey_mouse.json";
import type { Character } from "../models/Character";

const PAGE_SIZE = 10;

const allCharacters = [
  // The local data has no allies at all, so Mickey gets some here
  { ...mickeyMouse.data, allies: ["Goofy", "Donald Duck"] },
  ...characters.data,
  // Only in a film whose title contains "Fantasia", to tell exact matches from partial ones
  { ...characters.data[0], _id: 9001, name: "Fantasia 2000 Extra", films: ["Fantasia 2000"], tvShows: [] },
] as unknown as Character[];

function jsonResponse(body: unknown, status: number = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

// Behaves like api.disneyapi.dev, including its quirks: filters are case-insensitive regular expressions,
// an invalid regular expression is a 500, an unknown id is a 200 with an array, and exactly one match on a
// list comes back as an object.
export async function fakeFetch(input: RequestInfo | URL): Promise<Response> {
  const url = new URL(String(input));
  const id = url.pathname.match(/^\/character\/(\d+)$/)?.[1];

  if (id !== undefined) {
    const character = allCharacters.find((candidate) => candidate._id === Number(id));
    return jsonResponse({ info: { count: character ? 1 : 0, totalPages: character ? 1 : 0 }, data: character ?? [] });
  }

  let matches = allCharacters;
  try {
    const name = url.searchParams.get("name");
    const films = url.searchParams.get("films");
    const tvShows = url.searchParams.get("tvShows");
    if (name !== null) {
      const pattern = new RegExp(name, "i");
      matches = matches.filter((character) => pattern.test(character.name));
    }
    if (films !== null) {
      const pattern = new RegExp(films, "i");
      matches = matches.filter((character) => character.films.some((film) => pattern.test(film)));
    }
    if (tvShows !== null) {
      const pattern = new RegExp(tvShows, "i");
      matches = matches.filter((character) => character.tvShows.some((show) => pattern.test(show)));
    }
  } catch {
    return jsonResponse({ error: "Internal server error" }, 500);
  }

  const page = Number(url.searchParams.get("page") ?? 1);
  const data = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return jsonResponse({
    info: { count: data.length, totalPages: Math.ceil(matches.length / PAGE_SIZE) },
    data: data.length === 1 ? data[0] : data,
  });
}
