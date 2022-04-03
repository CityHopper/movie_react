import {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import "../_header.scss"

function Header() {
    const navigate = useNavigate();
    const [isScrolledDown, setIsScrolledDown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuHandler = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const [onSearching, setOnSearching] = useState(false);

    const listenScrollEvent = event => {
        if (window.scrollY < 50) {
            return setIsScrolledDown(false);
        } else if (window.scrollY >= 50) {
            return setIsScrolledDown(true);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    const [searchInput, setSearchInput] = useState("");

    const onEnter = (e) => {
        if (e.key === "Enter") {
            setIsMobileMenuOpen(false)
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
            <nav role="navigation" className={
                (!isScrolledDown && !isMobileMenuOpen) ? "navbar flex__start" : "navbar navbar-dark flex__start"}>
                <Link className="navbar__title"
                      to={"/"} tabIndex={0}>ReactMovie</Link>
                <ul
                    className={isMobileMenuOpen
                        ? "navbar__menu active flex__between"
                        : "navbar__menu flex__between"}>
                    <li className="navbar__menu__item">
                        <NavLink className={"flex__center"} onClick={() => setIsMobileMenuOpen(false)}
                                 to={"/"}>Home</NavLink>
                    </li>
                    <li className="navbar__menu__item">
                        <NavLink className={"flex__center"} onClick={() => setIsMobileMenuOpen(false)}
                                 to={"/latest"}>Latest</NavLink>
                    </li>
                    <li className="navbar__menu__item">
                        <NavLink className={"flex__center"} onClick={() => setIsMobileMenuOpen(false)}
                                 to={"/search"}>Search</NavLink>
                    </li>
                </ul>
                <ul
                    className={isMobileMenuOpen
                        ? "navbar__misc active"
                        : "navbar__misc"}>
                    <li className="navbar__misc__search">
                        <button className={"navbar__misc__search__icon flex__center"}>
                            <img alt={"검색"}
                                 src={"../magnifier.png"}
                                 onClick={() => setOnSearching(!onSearching)}
                            />
                        </button>
                        <input type={"text"}
                               className={onSearching
                                   ? "navbar__misc__search__input active"
                                   : "navbar__misc__search__input"}
                               placeholder={"영화를 검색해보세요!"}
                               value={searchInput}
                               onChange={(e) => setSearchInput(e.target.value)}
                               onKeyPress={onEnter}
                        />
                    </li>
                    <li className="navbar__misc__item flex__center">
                        <NavLink className={"flex__center"} onClick={() => setIsMobileMenuOpen(false)}
                                 to={"/about"}>?</NavLink>
                    </li>
                </ul>

                <div className="navbar__toggle">
                    <input id="navbar__toggle__checkbox" type="checkbox" checked={isMobileMenuOpen}
                           onChange={mobileMenuHandler}
                    />
                    <label className="navbar__toggle__label" htmlFor="navbar__toggle__checkbox">
                        <span/>
                    </label>
                </div>
            </nav>
        </header>
    )
}

export default Header;