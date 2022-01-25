import React, {useState, useEffect} from "react";
import "./../movie.css"

function Movies () {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = async () => {
        const response = await fetch(
            'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year'
        );
        const json = await response.json();
        setMovies(json.data.movies);
        setLoading(false);
    }

    useEffect(() => {
        getMovies()
        console.log(movies)
    }, [movies])

    return (
        <>
            {loading
                ? (<h1>Loading...</h1>)
                :
                <>
                    { movies.map(movie => (
                        <section key={movie.id} className="movie flex__start">
                            <img alt={`${movie.title} poster`} src={movie.medium_cover_image} className="movie__img"/>
                            <div className="movie__summary">
                                <h2 className="movie__title">
                                    {movie.title} ({movie.year})
                                </h2>

                                {movie.genres.map(genre => (
                                    <span className="movie__genre">{genre}</span>
                                ))}
                            </div>
                        </section>
                    ))}
                </>
            }
        </>

    )
}

export default Movies;