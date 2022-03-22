import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import "../_movies.scss"
import {useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";

function Search() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([])
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // https://yts.mx/api/v2/list_movies.json?quality=3D

    useEffect(() => {
        console.log(location)
        if (location.state) {
            setLoading(true)
            setMovies(location.state.data.movies)
            setLoading(false);
        }
    }, [location])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover cover-search flex__center">
                            <form>
                                <input type={"text"}/>
                            </form>
                        </div>
                        <Movies movies={movies}/>
                    </section>
                </>
            }
        </>

    )
}

export default Search;