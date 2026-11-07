import type { Character } from "../Character";

export interface TvShowCharactersContentComponentProps {
  show: string;
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
