import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getAllCharacters } from "../controllers/DisneyCharacterController";
import type { CharacterListResponse } from "../models/CharacterListResponse";
import { parsePage } from "../utils/parsePage";
import CharacterListItemsComponent from "./CharacterListItemsComponent";
import PaginationComponent from "./PaginationComponent";

// How long to wait after the last change before calling the API, so typing doesn't send a request per letter
const SEARCH_DELAY_MS = 300;

interface LoadedPage {
  page: number;
  name: string;
  // null = error
  response: CharacterListResponse | null;
}

function CharacterListComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const name = searchParams.get("name") ?? "";
  const [loaded, setLoaded] = useState<LoadedPage | undefined>(undefined);

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another page or search
    let isCurrent = true;
    const timeout = setTimeout(() => {
      getAllCharacters(page, name).then((response) => {
        if (isCurrent) {
          setLoaded({ page, name, response });
        }
      });
    }, SEARCH_DELAY_MS);
    return () => {
      isCurrent = false;
      clearTimeout(timeout);
    };
  }, [page, name]);

  function goToPage(newPage: number) {
    setSearchParams(name ? { name, page: String(newPage) } : { page: String(newPage) });
    window.scrollTo(0, 0);
  }

  function search(newName: string) {
    // A new search starts from page 1, and replace keeps each letter out of the browser history
    setSearchParams(newName ? { name: newName } : {}, { replace: true });
  }

  // undefined = still loading, null = error, object = loaded
  const response = loaded?.page === page && loaded.name === name ? loaded.response : undefined;

  return (
    <div>
      <input
        type="search"
        className="search-bar"
        placeholder="Search by name"
        aria-label="Search characters by name"
        value={name}
        onChange={(event) => search(event.target.value)}
      />
      {response === undefined && <p>Loading characters...</p>}
      {response === null && <p>Something went wrong while loading the characters. Please try again later.</p>}
      {response && (
        <>
          {response.data.length === 0 ? (
            <p>No characters found</p>
          ) : (
            <>
              <p>Pick a character</p>
              <CharacterListItemsComponent characters={response.data} />
            </>
          )}
          {response.info.totalPages > 1 && (
            <PaginationComponent
              currentPage={page}
              totalPages={response.info.totalPages}
              onPageChange={goToPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default CharacterListComponent;
