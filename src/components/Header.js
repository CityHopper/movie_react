import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "../header.scss"

function Header() {
    const [navbarDark, setNavbarDark] = useState(false);

    const listenScrollEvent = event => {
        if (window.scrollY < 50) {
            return setNavbarDark(false);
        } else if (window.scrollY >= 50) {
            return setNavbarDark(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <header>
            <nav role="navigation" className={navbarDark
                ? "navbar navbar-dark flex__start"
                : "navbar flex__start"}>
                <Link className="navbar__title"
                      to={"/"} tabIndex={0}>ReactMovie</Link>
                <ul className="navbar__menu flex__between">
                    <li className="navbar__item">
                        <Link to={"/"}>_random film</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>_masterpiece</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>_by genre</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>_box office</Link>
                    </li>
                </ul>
                <ul className="navbar__misc">
                    <li className="navbar__search">dd</li>
                    <li className="navbar__icon">ss</li>
                </ul>
            </nav>

        </header>
    )
}

export default Header;