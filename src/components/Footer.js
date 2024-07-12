import React from "react";
import '../styles/footer.css'
import github from '../github.svg'

const Footer = () => {
    return(
        <footer className="footer">
            <div className="rights">
            &copy; 2024 Marvel. Todos los derechos reservados.
            </div>
            <div className="created-by">
                dev by <a href="https://github.com/mrcal56" target="_blank" rel="noopener noreferrer">mrcal56 &#128153;</a>
            </div>
        </footer>
    );
}

export default Footer;