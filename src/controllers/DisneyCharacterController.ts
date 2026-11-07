import type { CharacterListResponse } from "../models/CharacterListResponse";
import type { SingleCharacterResponse } from "../models/SingleCharacterResponse";

const API_URL = "https://api.disneyapi.dev/character";

// The API treats filter values as regular expressions: "Hercules (film)" finds nothing, and "Fantasia"
// also finds "Fantasia 2000". Escaping and anchoring the title matches only that title (ignoring case).
function exactMatch(title: string): string {
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return encodeURIComponent(`^${escapedTitle}$`);
}

async function fetchCharacterList(query: string): Promise<CharacterListResponse | null> {
  try {
    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    // When exactly one character matches, the API returns it as an object instead of an array
    return { ...body, data: Array.isArray(body.data) ? body.data : [body.data] };
  } catch {
    return null;
  }
}

export function getAllCharacters(page: number = 1, name: string = ""): Promise<CharacterListResponse | null> {
  const nameParameter = name ? `&name=${encodeURIComponent(name)}` : "";
  return fetchCharacterList(`page=${page}${nameParameter}`);
}

export function getCharactersByFilm(film: string, page: number = 1): Promise<CharacterListResponse | null> {
  return fetchCharacterList(`page=${page}&films=${exactMatch(film)}`);
}

export function getCharactersByTvShow(show: string, page: number = 1): Promise<CharacterListResponse | null> {
  return fetchCharacterList(`page=${page}&tvShows=${exactMatch(show)}`);
}

export async function getCharacterById(id: number): Promise<SingleCharacterResponse | null> {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      return null;
    }
    const body = await response.json();
    // The API answers 200 with an array, not a character, when the id doesn't exist
    return Array.isArray(body.data) ? null : body;
  } catch {
    return null;
  }
}
