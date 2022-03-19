import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from "swiper";
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
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    scrollbar={{ draggable: true }}
                    className=""
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    {props.movies.movies.map((movie) => (
                        <SwiperSlide key={movie.id} className={""}>
                            {/*<Link to={`/movies/${movie.id}`}>*/}
                                <article className={"carousel__background"}
                                     style={{backgroundImage: `url(${movie.background_image})`}}/>
                            {/*</Link>*/}
                        </SwiperSlide>
                    ))
                    }
                </Swiper>
            }
        </>
    )
}

export default Carousel;