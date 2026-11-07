import type { Character } from "../models/Character";
import CharacterListItemsComponent from "./CharacterListItemsComponent";
import PaginationComponent from "./PaginationComponent";

interface TvShowCharactersContentComponentProps {
  show: string;
  characters: Character[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function TvShowCharactersContentComponent({ show, characters, currentPage, totalPages, onPageChange }: TvShowCharactersContentComponentProps) {
  return (
    <>
      <h2 className="character-list-title">Characters in {show}</h2>
      {characters.length === 0 ? (
        <p>No characters found</p>
      ) : (
        <>
          <p>Pick a character</p>
          <CharacterListItemsComponent characters={characters} />
        </>
      )}
      {totalPages > 1 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}

export default TvShowCharactersContentComponent;
