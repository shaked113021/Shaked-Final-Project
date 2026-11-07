import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getAllCharacters } from "../controllers/DisneyCharacterController";
import type { CharacterListResponse } from "../models/CharacterListResponse";
import CharacterListItemsComponent from "./CharacterListItemsComponent";
import PaginationComponent from "./PaginationComponent";

interface LoadedPage {
  page: number;
  // null = error
  response: CharacterListResponse | null;
}

function parsePage(value: string | null): number {
  const page = Number(value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function CharacterListComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parsePage(searchParams.get("page"));
  const [loaded, setLoaded] = useState<LoadedPage | undefined>(undefined);

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another page
    let isCurrent = true;
    getAllCharacters(page).then((response) => {
      if (isCurrent) {
        setLoaded({ page, response });
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [page]);

  function goToPage(newPage: number) {
    setSearchParams({ page: String(newPage) });
    window.scrollTo(0, 0);
  }

  // undefined = still loading, null = error, object = loaded
  const response = loaded?.page === page ? loaded.response : undefined;

  return (
    <div>
      {response === undefined && <p>Loading characters...</p>}
      {response === null && <p>Something went wrong while loading the characters. Please try again later.</p>}
      {response && (
        <>
          <p>Please select a character</p>
          <CharacterListItemsComponent characters={response.data} />
          <PaginationComponent
            currentPage={page}
            totalPages={response.info.totalPages}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  );
}

export default CharacterListComponent;
