import React from "react";
import "../header.css"

function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar__title">
                    <a tabIndex={0}>MOVIES</a>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__menu-item">
                        <a href="#">_hello</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_career</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_project</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_dream</a>
                    </li>
                </ul>
                <ul className="navbar__misc">
                    <li className="navbar__icon">dd</li>
                    <li className="navbar__icon">ss</li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;