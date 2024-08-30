import React, { useState, useCallback, useEffect } from "react";
import { useMarvelContext } from "../context/MarvelContex";
import '../styles/searchBar.css';
import { debounce } from 'lodash'; // Asegúrate de instalar lodash con `npm install lodash`

const SearchBar = () => {
    const { setNameStartsWith } = useMarvelContext();
    const [input, setInput] = useState('');

    // Crea la función de debounce usando useCallback para evitar que se recree en cada render
    const debouncedSetNameStartsWith = useCallback(
        debounce((value) => {
            setNameStartsWith(value);
        }, 500), // Ajusta el tiempo de debounce según sea necesario
        [setNameStartsWith] // Asegúrate de incluir setNameStartsWith en las dependencias
    );

    // Limpia la función de debounce cuando el componente se desmonte
    useEffect(() => {
        return () => {
            debouncedSetNameStartsWith.cancel();
        };
    }, [debouncedSetNameStartsWith]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        debouncedSetNameStartsWith(value); // Usa la función debounced
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Busca a personaje Marvel"
            />
        </div>
    );
}

export default SearchBar;
