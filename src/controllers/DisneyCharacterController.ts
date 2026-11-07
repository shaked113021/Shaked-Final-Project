import type { CharacterListResponse } from "../models/CharacterListResponse";
import type { SingleCharacterResponse } from "../models/SingleCharacterResponse";
import mickeyMouse from "../data/mickey_mouse.json";
import type { Character } from "../models/Character";

const API_URL = "https://api.disneyapi.dev/character";

const singleCharacter: SingleCharacterResponse = {
  info: {
    count: mickeyMouse.info.count as number,
    totalPages: mickeyMouse.info.totalPages as number,
    previousPage: (mickeyMouse.info.previousPage === null ? undefined : mickeyMouse.info.previousPage),
    nextPage: (mickeyMouse.info.nextPage === null ? undefined : mickeyMouse.info.nextPage)
  },
  data: (mickeyMouse.data as unknown) as Character
};

export async function getAllCharacters(page: number = 1): Promise<CharacterListResponse | null> {
  try {
    const response = await fetch(`${API_URL}?page=${page}`);
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

export function getCharacterById(id: number): SingleCharacterResponse {
  return singleCharacter;
}
