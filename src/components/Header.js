import React from "react";
import '../styles/header.css'
import { Link } from "react-router-dom";


const Header = () => {
    return(
        <header className="header">
            <div className="left-tab">
                <Link to='/'>Home</Link>
            </div>
            <div class='content'>
            <div class='visible'>
            <p>Marvel</p>
            <ul>
            <li>World</li>
            <li>Comics</li>
            <li>Heroes</li>
            </ul>
        </div>
        </div>
            <div className="right-tab">
               <Link to="/favorites"> Favorites</Link> 
            </div>
        </header>
    )
}

export default Header;
