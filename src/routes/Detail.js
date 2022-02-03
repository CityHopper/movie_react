import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "../_movies.scss"

function Detail() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState();
    const getDetail = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json()
        setDetail(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getDetail()
    }, [])

    useEffect(() => {
        console.log(detail)
    }, [detail])

    return (
        <article className="detail">
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                : <>
                    <div className="detail__background"
                         style={{backgroundImage: `url(${detail.background_image})`}}/>
                    <div className="container--small">
                        <div className="detail__content flex__between">
                            <img className="detail__poster" alt={`poster`}
                                 src={detail.medium_cover_image}/>
                            <div className="detail__description">
                                <h1 className="detail__title">
                                    {detail.title}
                                </h1>
                                <div className="detail__item">
                                    {detail.year} ・ {detail.runtime} mins
                                </div>
                                <div className={"detail__item"}>
                                    Rating: <b>{detail.rating}</b>
                                </div>
                                <div className="detail__item">
                                    {detail.genres.map((genre, index) => (
                                        <span key={index} className={"detail__genre"}>
                                            {genre}</span>))
                                    }
                                </div>
                                <p>{detail.description_full}</p>

                            </div>

                        </div>
                    </div>
                </>
            }
        </article>
    )
}

export default Detail;