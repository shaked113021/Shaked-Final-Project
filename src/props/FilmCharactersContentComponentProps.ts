import type { Character } from "../models/Character";

export interface FilmCharactersContentComponentProps {
  film: string;
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
