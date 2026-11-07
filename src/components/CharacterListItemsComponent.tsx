import type { Character } from "../models/Character";

interface CharacterListItemsComponentProps {
  characters: Character[];
}

function CharacterListItemsComponent({ characters }: CharacterListItemsComponentProps) {
  return (
    <ul className="character-list">
      {characters.map((character) => (
        <li key={character._id} className="character-card">
          <span className="character-card-name">{character.name}</span>
          {character.imageUrl && (
            <img className="character-card-image" src={character.imageUrl} alt={character.name} />
          )}
        </li>
      ))}
    </ul>
  );
}

export default CharacterListItemsComponent;
