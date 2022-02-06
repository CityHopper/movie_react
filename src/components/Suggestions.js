import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import "./../_suggestions.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Suggestions(props) {
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
                ? <p>Loading...</p>
                : <Swiper
                    // install Swiper modules
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {suggestions.data.movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/movies/${movie.id}`} key={movie.id}
                                  className="suggestions"
                                  onClick={() => window.location.reload()}>
                                <img className="suggestion__poster" alt={`poster`}
                                     src={movie.medium_cover_image}/>
                                <h4 className="suggestions__title">{movie.title_long}</h4>
                            </Link>
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            }
        </>
    )
}

export default Suggestions;