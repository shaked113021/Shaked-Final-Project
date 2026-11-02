export interface Character {
  _id: number;
  url: string;
  name: string;
  sourceUrl: string;
  imageUrl: string;
  films: [string];
  shortFilms: [string];
  tvShows: [string];
  videoGames: [string];
  parkAttractions: [string];
  allies: [string];
  enemies: [string];
};
