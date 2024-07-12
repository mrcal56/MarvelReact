import React from "react";
import { useMarvelContext } from "../context/MarvelContex";
import '../styles/marvel.css'
import '../styles/characterCard.css'
import CharacterCard from "./CharacterCard";



const MarvelApi = () => {
    const { characters } = useMarvelContext();
    
    return(
        <div className="character-list">
            {characters.map(character => (
                <CharacterCard key={character.id} character={character}  />
             ))}
        </div>
    )
}

export default MarvelApi;