import { Link, Routes, Route } from 'react-router';
import CharacterListComponent from './components/CharacterListComponent.tsx';
import CharacterDetailsComponent from './components/CharacterDetailsComponent.tsx';
import FilmCharactersComponent from './components/FilmCharactersComponent.tsx';
import TvShowCharactersComponent from './components/TvShowCharactersComponent.tsx';

function App() {
  return (
    <>
      <h1><Link to="/" className="home-link">Disney Character Encyclopedia</Link></h1>
      <Routes>
        <Route index element={<CharacterListComponent />} />
        <Route path="items/:id/" element={<CharacterDetailsComponent />} />
        <Route path="films/:film" element={<FilmCharactersComponent />} />
        <Route path="tv_shows/:show" element={<TvShowCharactersComponent />} />
      </Routes>
    </>
  );
}

export default App;
