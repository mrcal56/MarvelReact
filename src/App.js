import React from 'react';
import './App.css';
import { MarvelProvider } from './context/MarvelContex';
import './styles/marvel.css'; // Estilos CSS específicos para Marvel
import MarvelApi from './components/MarvelAPI.js';
import './styles/marvel.css'; // Importar estilos generales
import './styles/characterCard.css'; // Importar estilos específicos para CharacterCard
import SearchBar from './components/SearchBar.js';



function App() {
  return (
    <div className="App">
      <h1>Marvel Personajes </h1>
      <MarvelProvider>
        <SearchBar/>
        <MarvelApi/>
      </MarvelProvider>
    </div>
  );
}

export default App;
