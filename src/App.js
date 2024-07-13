import React from 'react';
import './App.css';
import { MarvelProvider } from './context/MarvelContex';
import './styles/marvel.css'; // Estilos CSS específicos para Marvel
import MarvelApi from './components/MarvelAPI.js';
import './styles/marvel.css'; // Importar estilos generales
import './styles/characterCard.css'; // Importar estilos específicos para CharacterCard
import SearchBar from './components/SearchBar.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Favorites from './components/Favorites.js';
import CharacterDetail from './components/CharacterDetail.js';



function App() {

  console.log('Rendering App component...');
  return (
  <Router>
    <div className="App">
      <MarvelProvider>
        <Header/>
        <SearchBar/>
          <Routes>
          <Route path="/" element={<MarvelApi />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:characterId" element={<CharacterDetail />} />
          </Routes>
        <Footer/>
      </MarvelProvider>
    </div>
  </Router>
  );
}

export default App;
