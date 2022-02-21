import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
// https://swiperjs.com/demos

function Carousel(props) {
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

    return (
        <>
            {loading
                ? <p>Loading...</p>
                : <Swiper
                    modules={[Navigation]}
                    spaceBetween={10}
                    slidesPerView={3}
                    navigation={true}
                    className="carousel"
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {suggestions.data.movies.map((movie) => (
                        <SwiperSlide key={movie.id} className="carousel__item">
                            <Link to={`/movies/${movie.id}`}>
                                <img className="" alt={`poster`}
                                     src={movie.medium_cover_image}/>
                                <h4 className="">{movie.title_long}</h4>
                            </Link>
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            }
        </>
    )
}

export default Carousel;