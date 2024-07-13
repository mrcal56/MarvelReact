import React from 'react';
import { useMarvelContext } from "../context/MarvelContex";
import CharacterCard from './CharacterCard';
import '../styles/favorites.css'
const Favorites = () => {
    const { favorites } = useMarvelContext();


    return (
        <div className="favorite-container">
            <div className="favorite-list">
                {favorites.length === 0 ? (
                    <p>No favorite characters yet!</p>
                    
                ):(
                   favorites.map(character => (
                    <CharacterCard key={character.id} character={character} />
                   )) 
                )}
            </div>
        </div>
    );
};

export default Favorites;
