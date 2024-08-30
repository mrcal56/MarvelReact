import React, { createContext, useContext, useEffect, useState } from "react";
import MarvelApiService from "../services/marvelApiService";

const MarvelContext = createContext();

export const useMarvelContext = () => useContext(MarvelContext);

export const MarvelProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [nameStartsWith, setNameStartsWith] = useState('');
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [characterDetailCache, setCharacterDetailCache] = useState({});
    const [defaultCharacters, setDefaultCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                if (nameStartsWith.trim() === '') {
                    // Fetch default characters when the search term is empty
                    const results = await MarvelApiService.fetchCharacters(30, 0);
                    setDefaultCharacters(results);
                    setCharacters(results);
                } else {
                    // Fetch characters based on search term
                    const results = await MarvelApiService.fetchCharacters(80, 0, nameStartsWith);
                    setCharacters(results);
                }
            } catch (error) {
                console.error("Error fetching characters:", error);
                setCharacters([]);
            }
        };

        fetchCharacters();
    }, [nameStartsWith]);

    const fetchCharacterDetail = async (characterId) => {
        try {
            if (!characterDetailCache[characterId]) {
                const character = await MarvelApiService.fetchCharacterById(characterId);
                if (characterId === character.id.toString()) {
                    setCharacterDetailCache(prevCache => ({
                        ...prevCache,
                        [characterId]: character
                    }));
                }
                return character;
            } else {
                return characterDetailCache[characterId];
            }
        } catch (error) {
            console.error(`Error fetching character detail for ID ${characterId}`, error);
            return null;
        }
    }

    const addFavorite = (character) => {
        const newFavorites = [...favorites, character];
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    const removeFavorite = (characterId) => {
        const newFavorites = favorites.filter(fav => fav.id !== characterId);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }

    return (
        <MarvelContext.Provider value={{ 
            characters, 
            setNameStartsWith, 
            addFavorite, 
            removeFavorite, 
            favorites, 
            fetchCharacterDetail, 
            characterDetailCache, 
            defaultCharacters
        }}>
            {children}
        </MarvelContext.Provider>
    );
};

export default MarvelContext;
