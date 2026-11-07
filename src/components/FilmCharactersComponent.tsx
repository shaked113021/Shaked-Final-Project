import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { getCharactersByFilm } from "../controllers/DisneyCharacterController";
import type { CharacterListResponse } from "../models/CharacterListResponse";
import { parsePage } from "../utils/parsePage";
import FilmCharactersContentComponent from "./FilmCharactersContentComponent";

interface LoadedPage {
  film: string;
  page: number;
  // null = error
  response: CharacterListResponse | null;
}

function FilmCharactersComponent() {
  const { film = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const [loaded, setLoaded] = useState<LoadedPage | undefined>(undefined);

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another page
    let isCurrent = true;
    getCharactersByFilm(film, page).then((response) => {
      if (isCurrent) {
        setLoaded({ film, page, response });
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [film, page]);

  function goToPage(newPage: number) {
    setSearchParams({ page: String(newPage) });
    window.scrollTo(0, 0);
  }

  // undefined = still loading, null = error, object = loaded
  const response = loaded?.film === film && loaded.page === page ? loaded.response : undefined;

  return (
    <div>
      {response === undefined && <p>Loading characters...</p>}
      {response === null && <p>Something went wrong while loading the characters. Please try again later.</p>}
      {response && (
        <FilmCharactersContentComponent
          film={film}
          characters={response.data}
          currentPage={page}
          totalPages={response.info.totalPages}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
}

export default FilmCharactersComponent;
