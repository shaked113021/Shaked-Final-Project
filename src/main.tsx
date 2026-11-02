import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import CharacterListComponent from './components/CharacterListComponent.tsx';
import { BrowserRouter, Routes, Route } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<CharacterListComponent />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
