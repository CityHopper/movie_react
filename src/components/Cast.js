import {useEffect} from "react";
import "./../_cast.scss";

function Cast(props) {
    useEffect(() => {
        console.log(props)
    })


    return (
        <>
            <h2>캐스트</h2>
            <div className="cast-container">
                {props.cast.map((c, index) => (
                    <div className={"cast"} key={index}>
                        <img className="cast__photo" alt={`photo`}
                             src={c.url_small_image
                                 ? c.url_small_image
                                 : "https://i1.sndcdn.com/avatars-000566440740-efgezt-t240x240.jpg"}/>

                        <h4 className="cast__name">{c.name}</h4>
                        <h4 className="cast__role">{c.character_name
                            ? `(as ${c.character_name})`
                            : ""}</h4>
                    </div>
                ))
                }
            </div>
        </>
    )
}

export default Cast;