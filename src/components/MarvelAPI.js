import React from "react";
import { useMarvelContext } from "../context/MarvelContex";
import '../styles/marvel.css';
import '../styles/characterCard.css';
import CharacterCard from "./CharacterCard";

const MarvelApi = () => {
    const { characters, defaultCharacters } = useMarvelContext();
    const displayCharacters = characters.length > 0 ? characters : defaultCharacters;

    return (
        <div className="character-list">
            {displayCharacters.map(character => (
                <CharacterCard key={character.id} character={character} />
            ))}
        </div>
    );
}

export default MarvelApi;
