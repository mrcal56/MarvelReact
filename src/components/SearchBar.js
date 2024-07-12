import React, { useState } from "react";
import { useMarvelContext } from "../context/MarvelContex";
import '../styles/searchBar.css'


const SearchBar = () => {
    const { setNameStartsWith } = useMarvelContext();
    const [input,setInput] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        setNameStartsWith(value);

    };

    return(
        <div className="search-bar">
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder="Busca A Tu Personaje Favorito De Marvel" />
        </div>
    )
}

export default SearchBar;