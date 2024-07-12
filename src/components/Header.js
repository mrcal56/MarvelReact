import React from "react";
import '../styles/header.css'
import { Link } from "react-router-dom";


const Header = () => {
    return(
        <header className="header">
            <div className="left-tab">
                <Link to='/'>Home</Link>
            </div>
            <div className="title">
                <h1>Marvel World</h1>
            </div>
            <div className="right-tab">
               <Link to="/favorites"> Favorites</Link> 
            </div>
        </header>
    )
}

export default Header;
