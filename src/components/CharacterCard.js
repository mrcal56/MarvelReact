import React from "react";
import '../styles/characterCard.css'; // Importa los estilos CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { useMarvelContext } from "../context/MarvelContex";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";

const CharacterCard = ({character}) => {

    const {favorites, addFavorite, removeFavorite} = useMarvelContext();

    const isFavorite = favorites.some(fav => fav.id === character.id)

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(character.id);
        }else {
            addFavorite(character)
        }
    }
    
    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
    
    return(
        <div className="character-card">
            <img src={imageUrl} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description || 'No Hay Descripcion Disponible'}</p>
            <div className="button-group">
                <button onClick={handleFavoriteClick} className="favorite"> 
                <FontAwesomeIcon icon={ faStar } className={isFavorite ? "star-icon active" : "star-icon"} title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} />
                </button>
                <button className="info">
                    <FontAwesomeIcon icon={faEye} title="View Character"/>
                </button>

            </div>
        </div>
    );
};

export default CharacterCard;