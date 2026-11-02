import type { CharacterListResponse } from "../models/CharacterListResponse";
import type { SingleCharacterResponse } from "../models/SingleCharacterResponse";
import characters from "../data/characters.json";
import mickeyMouse from "../data/mickey_mouse.json";
import type { Character } from "../models/Character";

const characterList: CharacterListResponse = {
  info: {
    count: characters.info.count as number,
    totalPages: characters.info.totalPages as number,
    previousPage: (characters.info.previousPage === null ? undefined : characters.info.previousPage),
    nextPage: (characters.info.nextPage === null ? undefined : characters.info.nextPage)
  },
  data: (characters.data as [unknown]) as [Character]
};

const singleCharacter: SingleCharacterResponse = {
  info: {
    count: mickeyMouse.info.count as number,
    totalPages: mickeyMouse.info.totalPages as number,
    previousPage: (mickeyMouse.info.previousPage === null ? undefined : mickeyMouse.info.previousPage),
    nextPage: (mickeyMouse.info.nextPage === null ? undefined : mickeyMouse.info.nextPage)
  },
  data: (mickeyMouse.data as unknown) as Character
};

export function getAllCharacters(page: number = 1): CharacterListResponse {
  return characterList;
}

export function getCharacterById(id: number): SingleCharacterResponse {
  return singleCharacter;
}
