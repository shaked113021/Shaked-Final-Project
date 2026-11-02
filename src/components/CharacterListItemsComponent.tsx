import type { Character } from "../models/Character";

interface CharacterListItemsComponentProps {
  characters: Character[];
}

function CharacterListItemsComponent({ characters }: CharacterListItemsComponentProps) {
  return (
    <ul>
      {characters.map((character) => (
        <li key={character._id}>
          {character.imageUrl && (
            <img src={character.imageUrl} alt={character.name} width={100} />
          )}
          <span>{character.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default CharacterListItemsComponent;
