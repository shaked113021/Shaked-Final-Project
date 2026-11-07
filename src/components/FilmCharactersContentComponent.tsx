import CharacterListItemsComponent from "./CharacterListItemsComponent";
import PaginationComponent from "./PaginationComponent";
import type { FilmCharactersContentComponentProps } from "../models/props/FilmCharactersContentComponentProps";

function FilmCharactersContentComponent({ film, characters, currentPage, totalPages, onPageChange }: FilmCharactersContentComponentProps) {
  return (
    <>
      <h2 className="character-list-title">Characters in {film}</h2>
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

export default FilmCharactersContentComponent;
