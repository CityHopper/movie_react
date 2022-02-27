import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
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

    const navigate = useNavigate();
    // const history = useHistory();

    return (
        <header>
            <nav role="navigation" className={navbarDark
                ? "navbar navbar-dark flex__start"
                : "navbar flex__start"}>
                <Link className="navbar__title"
                      to={"/"} tabIndex={0}>ReactMovie</Link>
                <ul onClick={() => setIsMobileMenuOpen(false)}
                    className={isMobileMenuOpen
                    ? "navbar__menu active flex__between"
                    : "navbar__menu flex__between"}>
                    <li className="navbar__item">
                        <Link to={"/movies"}>Browse</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>Trending</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/"}>Menu3</Link>
                    </li>
                </ul>
                <ul onClick={() => setIsMobileMenuOpen(false)}
                    className={isMobileMenuOpen
                    ? "navbar__misc active"
                    : "navbar__misc"}>
                    <li className="navbar__search">dd</li>
                    <li className="navbar__icon">ss</li>
                </ul>
                <button className={isMobileMenuOpen ? "navbar__toggle active" : "navbar__toggle"}
                        onClick={mobileMenuHandler}>
                    메뉴
                </button>
            </nav>
            <button className="button--go-back"
                onClick={() => navigate(-1)}>뒤로</button>

        </header>
    )
}

export default Header;