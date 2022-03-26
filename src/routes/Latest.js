import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import "../_movies.scss"

function Latest() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([])
    const getMovies = useCallback(async () => {
        const response = await fetch(
            'https://yts.mx/api/v2/list_movies.json'
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
                        <div className="cover bg--green flex__center">
                            <h1 style={{
                                zIndex:1,
                                textAlign:"center",
                                wordBreak:"keep-all",
                                padding:"1em"
                            }}>
                                가장 최근에 추가된 영화들을 만나보세요!
                            </h1>
                        </div>
                        <Movies movies={movies}/>
                    </section>
                </>
            }
        </>

    )
}

export default Latest;