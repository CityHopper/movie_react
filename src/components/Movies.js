import React, {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import "../_movies.scss"

function Movies() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = useCallback(async () => {
        const response = await fetch(
            'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=rating'
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    }, [])

    useEffect(() => {
        getMovies()
    }, [getMovies])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover"/>
                        {movies.map(movie => (
                            <Link to={`/movies/${movie.id}`} key={movie.id}
                                  className="movie flex__between">
                                <img alt={`${movie.title} poster`} src={movie.medium_cover_image}
                                     className="movie__img"/>
                                <div className="movie__summary">
                                    <h1 className="movie__title">
                                        {movie.title} ({movie.year})
                                    </h1>
                                    <div className="movie__genres flex__start flex__wrap">
                                        {movie.genres.map((genre, index) => (
                                            <span key={index} className="movie__genres__genre">
                                        {genre}
                                    </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="movie__rating flex__center">
                                    {movie.rating}
                                </div>

                            </Link>
                        ))}
                    </section>
                </>
            }
        </>

    )
}

export default Movies;