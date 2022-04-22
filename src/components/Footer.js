import {Link} from 'react-router-dom';
import "../_footer.scss";

function Footer() {
    const thisYear = new Date().getFullYear();

    return (
        <footer className={"flex__center flex__column"}>
            <ul className={"footer__links"}>
                <li><Link to={`https://github.com/CityHopper/react_movie`}>GitHub</Link></li>
                <li><Link to={`https://is-this-it.tistory.com/`}>Blog</Link></li>
            </ul>
            <p>Copyright &copy; {thisYear}. CityHopper All Rights Reserved</p>

        </footer>
    )
}

export default Footer;