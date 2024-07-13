import React, { useEffect } from "react";
import '../styles/characterDetail.css';
import { useMarvelContext } from "../context/MarvelContex";
import { useParams } from "react-router-dom";
const CharacterDetail = () => {
    const { characterId } = useParams();
    const { fetchCharacterDetail, characterDetailCache } = useMarvelContext();

    useEffect(() => {
        const getCharacterDetail = async () => {
            if (characterId) {
                try {
                    const character = await fetchCharacterDetail(characterId);
                    console.log('Character detail fetched:', character);
                } catch (error) {
                    console.error(`Error fetching character detail for ID ${characterId}`, error);
                }
            }
        };
        getCharacterDetail();
    }, [characterId, fetchCharacterDetail]); // Solo ejecutar useEffect cuando characterId o fetchCharacterDetail cambien

    const characterDetail = characterDetailCache[characterId];

    if (!characterDetail) {
        return <div>Sin detalles del personaje</div>;
    }

    const imageUrl = `${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`;

    return (
        <div className="character-detail-container">
            <img src={imageUrl} alt={characterDetail.name} />
            <div className="detail-text">
            <h2>{characterDetail.name}</h2>
            <p>{characterDetail.description}</p>
            </div>
        </div>
    );
};

export default CharacterDetail;