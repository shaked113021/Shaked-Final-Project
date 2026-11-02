import { useEffect, useState } from "react";
import { getAllCharacters } from "../controllers/DisneyCharacterController";
import type { Character } from "../models/Character";
import CharacterListItemsComponent from "./CharacterListItemsComponent";

function CharacterListComponent() {
  // undefined = still loading, null = error, array = loaded
  const [characters, setCharacters] = useState<Character[] | null | undefined>(undefined);

  useEffect(() => {
    const response = getAllCharacters();
    setCharacters(response === null ? null : response.data);
  }, []);

  return (
    <div>
      <h1>Disney Character Encyclopedia</h1>
      {characters === undefined && <p>Loading characters...</p>}
      {characters === null && <p>Something went wrong while loading the characters. Please try again later.</p>}
      {characters && (
        <>
          <p>Please select a character</p>
          <CharacterListItemsComponent characters={characters} />
        </>
      )}
    </div>
  );
}

export default CharacterListComponent;
