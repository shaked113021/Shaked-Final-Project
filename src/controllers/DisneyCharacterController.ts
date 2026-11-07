import type { CharacterListResponse } from "../models/CharacterListResponse";
import type { SingleCharacterResponse } from "../models/SingleCharacterResponse";

const API_URL = "https://api.disneyapi.dev/character";

export async function getAllCharacters(page: number = 1): Promise<CharacterListResponse | null> {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
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
