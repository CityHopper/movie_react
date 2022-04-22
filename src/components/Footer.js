import "../_footer.scss";

function Footer() {
    const thisYear = new Date().getFullYear();

    return (
        <footer className={"flex__center flex__column"}>
            <ul className={"footer__links"}>
                <li>
                    <button onClick={() => window.open(`https://github.com/CityHopper/react_movie`)}>
                        GitHub</button>
                </li>
                <li>
                    <button onClick={() => window.open("https://is-this-it.tistory.com")}>
                        Blog</button>
                </li>
            </ul>
            <p>Copyright &copy; {thisYear}. CityHopper All Rights Reserved</p>

        </footer>
    )
}

export default Footer;