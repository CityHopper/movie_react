import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import "./../_suggestions.scss";

function Suggestion(props) {
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState();

    const getSuggestion = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${props.id}`)
        ).json()
        setSuggestions(json);
        setLoading(false);
    }

    useEffect(() => {
        getSuggestion();
    }, [])

    useEffect(() => {
        console.log(suggestions)
    }, [suggestions])

    return (
        <>
            {loading
                ? <p className="flex__center">Loading...</p>
                : <>
                    <h2>비슷한 영화들</h2>
                    <div className="suggestion-container">
                    {suggestions.data.movies.map((movie, index) => (
                        <Link key={index} to={`/movies/${movie.id}`}
                            // onClick={() => window.location.reload()}
                              className="suggestion">
                            <img className="suggestion__poster" alt={`poster`}
                                 src={movie.medium_cover_image}/>
                            <h4 className="suggestion__title">{movie.title_long}</h4>
                        </Link>
                    ))
                    }
                    </div>
                </>
            }
        </>
    )
}

export default Suggestion;