import type { Character } from "./Character";
import type  { QueryMetadata } from "./QueryMetadata";

export interface CharacterListResponse {
  info: QueryMetadata;
  data: [Character];
};
