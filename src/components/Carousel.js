import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay, Pagination} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import "../_carousel.scss"
// https://swiperjs.com/demos

function Carousel(props) {
    return (
        <>
            {props.loading
                ? <p>Loading...</p>
                : <Swiper
                    modules={[Navigation, Autoplay, Pagination]}
                    autoplay={{
                        delay: 10000,
                        disableOnInteraction: false
                    }}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    // className=""
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                >
                    {props.movies.movies.map((movie) => (
                        <SwiperSlide key={movie.id} className={""}>
                                <article className={"carousel__background"}
                                     style={{backgroundImage: `url(${movie.background_image})`}}>
                                    <Link to={`/movies/${movie.id}`}
                                          className={"carousel__link flex__column"}>
                                        <img alt={`Poster of ${movie.title}`}
                                             src={movie.large_cover_image}
                                             className={"carousel__poster"}
                                        />
                                        <div className={"carousel__title flex__center"}>{movie.title_long}</div>
                                    </Link>
                                </article>
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            }
        </>
    )
}

export default Carousel;