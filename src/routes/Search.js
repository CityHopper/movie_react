import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import "../_movies.scss"
import {useLocation} from "react-router-dom";

function Search() {
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])

    useEffect(() => {
        console.log(location)
        setMovies(location.state.data.movies)
        setLoading(false);
    }, [location])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover cover-search">
                            <h1>dd</h1>
                        </div>
                        <Movies movies={movies}/>
                    </section>
                </>
            }
        </>

    )
}

export default Search;