import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../_header.scss"

function Header() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuHandler = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const [navbarDark, setNavbarDark] = useState(false);
    const [onSearching, setOnSearching] = useState(false);

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

    const [searchInput, setSearchInput] = useState("");

    const onEnter = (e) => {
        if (e.key === "Enter") {
            getSearchResult().then(r => {
                navigate(`/search/${searchInput}`, {state: r})
            });
        }
    }
    const getSearchResult = async () => {
        return await (
            await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${searchInput}&limit=50`)
        ).json()
    }

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
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/latest"}>Latest</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to={"/search"}>Search</Link>
                    </li>
                </ul>
                <ul onClick={() => setIsMobileMenuOpen(false)}
                    className={isMobileMenuOpen
                        ? "navbar__misc active"
                        : "navbar__misc"}>
                    <li className="navbar__search">
                        <button className={"navbar__search__icon flex__center"}>
                            <img alt={"검색"}
                                 src={"../magnifier.png"}
                                 className={""}
                                 onClick={() => setOnSearching(!onSearching)}
                            />
                        </button>
                        <input type={"text"}
                               className={onSearching
                                   ? "navbar__search__input active"
                                   : "navbar__search__input"}
                               placeholder={"영화를 검색해보세요!"}
                               value={searchInput}
                               onChange={(e) => setSearchInput(e.target.value)}
                               onKeyPress={onEnter}
                        />
                    </li>
                    <li className="navbar__icon"><Link to={"/"}>?</Link></li>
                </ul>
                <button className={isMobileMenuOpen ? "navbar__toggle active" : "navbar__toggle"}
                        onClick={mobileMenuHandler}>
                    메뉴
                </button>
            </nav>
            <button className="button--go-back"
                    onClick={() => navigate(-1)}>뒤로
            </button>

        </header>
    )
}

export default Header;