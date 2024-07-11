import React from "react";
import '../styles/characterCard.css'; // Importa los estilos CSS


const CharacterCard = ({character}) => {

    const imageUrl = `${character.thumbnail.path}.${character.thumbnail.extension}`
    
    return(
        <div className="character-card">
            <img src={imageUrl} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description || 'No Hay Descripcion Disponible'}</p>
        </div>
    );
};

export default CharacterCard;