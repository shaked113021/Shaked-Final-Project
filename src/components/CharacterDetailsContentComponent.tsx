import type { Character } from "../models/Character";

interface CharacterDetailsContentComponentProps {
  character: Character;
}

interface DetailsSectionProps {
  title: string;
  items: string[];
}

function DetailsSection({ title, items }: DetailsSectionProps) {
  return (
    <section className="character-details-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>None</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

function CharacterDetailsContentComponent({ character }: CharacterDetailsContentComponentProps) {
  return (
    <div className="character-details">
      <h2>{character.name}</h2>
      {character.imageUrl && (
        <img className="character-details-image" src={character.imageUrl} alt={character.name} />
      )}
      <DetailsSection title="Films" items={character.films} />
      <DetailsSection title="TV Shows" items={character.tvShows} />
      <DetailsSection title="Allies" items={character.allies} />
    </div>
  );
}

export default CharacterDetailsContentComponent;
