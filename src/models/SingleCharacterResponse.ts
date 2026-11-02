import type { Character } from "./Character";
import type { QueryMetadata } from "./QueryMetadata";

export interface SingleCharacterResponse {
  info: QueryMetadata;
  data: Character;
};
