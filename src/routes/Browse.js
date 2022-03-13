import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import "../_movies.scss"

function Browse() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = useCallback(async () => {
        const response = await fetch(
            'https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=rating'
        );
        return await response.json()
        // setMovies(json.data.movies);

    }, [])

    useEffect(() => {
        getMovies().then(r => {
            setMovies(r.data.movies)
            setLoading(false);
        })
    }, [getMovies])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover cover-browse"/>
                        <Movies movies={movies}/>
                    </section>
                </>
            }
        </>

    )
}

export default Browse;