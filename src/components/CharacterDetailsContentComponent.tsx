import { Link } from "react-router";
import type { CharacterDetailsContentComponentProps } from "../models/props/CharacterDetailsContentComponentProps";
import type { DetailsSectionProps } from "../models/props/DetailsSectionProps";

function DetailsSection({ title, items, getItemPath }: DetailsSectionProps) {
  return (
    <section className="character-details-section">
      <h3>{title}</h3>
      {items.length === 0 ? (
        <p>None</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item}>{getItemPath ? <Link to={getItemPath(item)}>{item}</Link> : item}</li>
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
      <DetailsSection
        title="Films"
        items={character.films}
        getItemPath={(film) => `/films/${encodeURIComponent(film)}`}
      />
      <DetailsSection
        title="TV Shows"
        items={character.tvShows}
        getItemPath={(show) => `/tv_shows/${encodeURIComponent(show)}`}
      />
      <DetailsSection title="Allies" items={character.allies} />
    </div>
  );
}

export default CharacterDetailsContentComponent;
