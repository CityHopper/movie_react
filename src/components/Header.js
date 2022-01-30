import React from "react";
import {Link} from "react-router-dom";
import "../header.scss"

function Header() {
    return (
        <header>
            <nav className="navbar">
                <div className="navbar__title">
                    <Link to={"/"} tabIndex={0}>MOVIES</Link>
                </div>
                <ul className="navbar__menu">
                    <li className="navbar__menu-item">
                        <Link to={"/"}>_random film</Link>
                    </li>
                    <li className="navbar__menu-item">
                        <Link to={"/"}>_masterpiece</Link>
                    </li>
                    <li className="navbar__menu-item">
                        <Link to={"/"}>_by genre</Link>
                    </li>
                    <li className="navbar__menu-item">
                        <Link to={"/"}>_box office</Link>
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