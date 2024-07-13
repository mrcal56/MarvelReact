import React from "react";
import '../styles/characterCard.css'; // Importa los estilos CSS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { useMarvelContext } from "../context/MarvelContex";
import { faStar } from "@fortawesome/free-solid-svg-icons/faStar";
import { useNavigate } from "react-router-dom";

const CharacterCard = ({character}) => {

    const {favorites, addFavorite, removeFavorite} = useMarvelContext();
    const navigate = useNavigate(); // Usa el hook useNavigate

    const isFavorite = favorites.some(fav => fav.id === character.id)

    const handleFavoriteClick = () => {
        if (isFavorite) {
            removeFavorite(character.id);
        }else {
            addFavorite(character)
        }
    }

    const handleInfoClick = () => {
        navigate(`/character/${character.id}`);
    };
    
    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
    
    return(
        <div className="character-card">
            <img src={imageUrl} alt={character.name} />
            <div className="text-container">
            <h2>{character.name}</h2>
            <p>{character.description || 'No Hay Descripcion Disponible'}</p>
            </div>
            <div className="button-group">
                <button  onClick={handleFavoriteClick} className="favorite"> 
                <FontAwesomeIcon icon={ faStar } className={isFavorite ? "star-icon active" : "star-icon"} title={isFavorite ? "Remove from Favorites" : "Add to Favorites"} />
                </button>
                <button onClick={handleInfoClick} className="info" >
                    <FontAwesomeIcon icon={faEye} title="View Character" className="view-icon"/>
                </button>

            </div>
        </div>
    );
};

export default CharacterCard;