import type { Character } from "../models/Character";

export interface TvShowCharactersContentComponentProps {
  show: string;
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
