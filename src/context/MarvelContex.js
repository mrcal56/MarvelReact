import React, { createContext, useContext, useEffect,useState } from "react";
import MarvelApiService from "../services/marvelApiService";

const MarvelContext = createContext();

export const useMarvelContext = () => useContext(MarvelContext);

export const MarvelProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [nameStartsWith, setNameStartsWith] = useState('');

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

  

    return (
        <MarvelContext.Provider value={{ characters: filteredCharacters, setSearchTerm, setNameStartsWith }}>
            {children}
        </MarvelContext.Provider>
    );
};



export default MarvelContext;

