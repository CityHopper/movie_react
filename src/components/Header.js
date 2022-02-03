import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "../_header.scss"

function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuHandler = () => setIsMobileMenuOpen(!isMobileMenuOpen);
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
                <ul className={isMobileMenuOpen
                    ? "navbar__menu active flex__between"
                    : "navbar__menu flex__between"}>
                    <li className="navbar__item">
                        <Link to={"/movies"}>Browse</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>Menu2</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>Menu3</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>Menu4</Link>
                    </li>
                </ul>
                <ul className={isMobileMenuOpen
                    ? "navbar__misc active"
                    : "navbar__misc"}>
                    <li className="navbar__search">dd</li>
                    <li className="navbar__icon">ss</li>
                </ul>
                <button className={isMobileMenuOpen ? "navbar__toggle active" : "navbar__toggle"}
                        onClick={mobileMenuHandler}>
                    버튼
                </button>
            </nav>

        </header>
    )
}

export default Header;