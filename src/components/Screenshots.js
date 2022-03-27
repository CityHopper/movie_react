import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination} from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";

export default function Screenshots(props) {

    return (
        <>
            <h2>스크린샷 ({props.screenshots.length})</h2>
            <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                scrollbar={{draggable: true}}
                spaceBetween={20}
                className=""
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
            >
                {props.screenshots.map((shot, id) => (
                    <SwiperSlide key={id} className={"flex__center"}>
                        <img alt={`Screenshot ${id}`}
                             src={shot}
                             className={""}
                             style={{width:"100%"}}
                        />
                    </SwiperSlide>
                ))
                }
            </Swiper>
        </>
    )
}