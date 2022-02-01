import React, {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import "../movies.scss"

function Movies() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = useCallback(async () => {
        const response = await fetch(
            'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
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
            <div className="cover"/>
            {loading
                ? (<h1>Loading...</h1>)
                :
                <section className="movie-container">
                    {movies.map(movie => (
                        <div key={movie.id} className="movie flex__start">
                            <img alt={`${movie.title} poster`} src={movie.medium_cover_image}
                                 className="movie__img"/>
                            <div className="movie__summary">
                                <Link to={`/movies/${movie.id}`}>
                                    <h1 className="movie__title">
                                        {movie.title} ({movie.year})
                                    </h1>
                                </Link>
                                {movie.genres.map((genre, index) => (
                                    <span key={index} className="movie__genre">
                                        {genre}
                                    </span>
                                ))}
                            </div>
                            <div className="movie__rating flex__center">
                                {movie.rating}
                            </div>

                        </div>
                    ))}
                </section>
            }
        </>

    )
}

export default Movies;