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
                        <a href="#">_random film</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_masterpiece</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_by genre</a>
                    </li>
                    <li className="navbar__menu-item">
                        <a href="#">_box office</a>
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