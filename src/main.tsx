import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CharacterListComponent from './components/CharacterListComponent.tsx';
import CharacterDetailsComponent from './components/CharacterDetailsComponent.tsx';
import { BrowserRouter, Link, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <h1><Link to="/" className="home-link">Disney Character Encyclopedia</Link></h1>
      <Routes>
        <Route index element={<CharacterListComponent />} />
        <Route path="items/:id/" element={<CharacterDetailsComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
