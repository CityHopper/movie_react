import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./../movies.scss"

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
        <>
            {loading
                ? (<h1>Loading...</h1>)
                : <>
                    <div className="detail">
                        <div className="detail__background"
                             style={{backgroundImage: `url(${detail.background_image})`}}/>
                        <h1 className="detail__title">
                            {detail.title}
                        </h1>

                    </div>
                </>
            }

        </>
    )
}

export default Detail;