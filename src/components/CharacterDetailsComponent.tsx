import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCharacterById } from "../controllers/DisneyCharacterController";
import type { Character } from "../models/Character";
import CharacterDetailsContentComponent from "./CharacterDetailsContentComponent";

interface LoadedCharacter {
  id: number;
  // null = not found or failed to load
  character: Character | null;
}

function CharacterDetailsComponent() {
  const id = Number(useParams().id);
  const [loaded, setLoaded] = useState<LoadedCharacter | undefined>(undefined);

  useEffect(() => {
    // Ignore a slow response if the user has already moved to another character
    let isCurrent = true;
    getCharacterById(id).then((response) => {
      if (isCurrent) {
        setLoaded({ id, character: response === null ? null : response.data });
      }
    });
    return () => {
      isCurrent = false;
    };
  }, [id]);

  // undefined = still loading, null = not found or error, object = loaded
  const character = loaded?.id === id ? loaded.character : undefined;

  return (
    <div>
      {character === undefined && <p>Loading character...</p>}
      {character === null && <p>Sorry, we couldn't load this character.</p>}
      {character && <CharacterDetailsContentComponent character={character} />}
    </div>
  );
}

export default CharacterDetailsComponent;
