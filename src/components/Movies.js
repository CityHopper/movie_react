import {Link} from "react-router-dom";
import "../_movies.scss"

function Movies(props) {

    return (
        <>
            {props.movies && props.movies.map(movie => (
                <Link to={`/movies/${movie.id}`} key={movie.id}
                      className="movie flex__between">
                    <img alt={`${movie.title} poster`} src={movie.medium_cover_image}
                         className="movie__poster"/>
                    <div className="movie__summary">
                        <h1 className="movie__title">
                            {movie.title} ({movie.year})
                        </h1>
                        <div className="movie__genres flex__wrap">
                            {movie.genres && movie.genres.map((genre, index) => (
                                <span key={index} className="movie__genres__genre">
                                        {genre}
                                    </span>
                            ))}
                        </div>
                    </div>
                    <div className="movie__rating flex__column">
                        <span>IMDb 평점</span>
                        <b>{movie.rating}</b>
                    </div>

                </Link>
            ))}
        </>
    )
}

export default Movies;