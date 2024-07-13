import React, { createContext, useContext, useEffect, useState } from "react";
import MarvelApiService from "../services/marvelApiService";

const MarvelContext = createContext();

export const useMarvelContext = () => useContext(MarvelContext);

export const MarvelProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nameStartsWith, setNameStartsWith] = useState('');
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });
    const [characterDetailCache, setCharacterDetailCache] = useState({});

    useEffect(() => {
        async function fetchCharacters() {
            try {
                let results = [];
                if (nameStartsWith && nameStartsWith.trim() !== '') {
                    results = await MarvelApiService.fetchCharacters(80, 0, nameStartsWith);
                } else {
                    results = await MarvelApiService.fetchCharacters(80, 0);
                }
                setCharacters(results);
            } catch (error) {
                console.error(error);
                setCharacters([]);
            }
        }

        fetchCharacters();
    }, [nameStartsWith]);

    const filteredCharacters = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        const newFavorites = [...favorites, character]
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    const removeFavorite = (characterId) => {
        const newFavorites = favorites.filter(fav => fav.id !== characterId)
        setFavorites(newFavorites)
        localStorage.setItem('favorites', JSON.stringify(newFavorites))
    }

    return (
        <MarvelContext.Provider value={{ characters: filteredCharacters, setSearchTerm, setNameStartsWith, addFavorite, removeFavorite, favorites, fetchCharacterDetail, characterDetailCache }}>
            {children}
        </MarvelContext.Provider>
    );
};

export default MarvelContext;
