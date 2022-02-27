import {Link} from "react-router-dom";
import "./../_download.scss";

function Download(props) {
    let quality = props.download.quality.slice(0, -1);

    return (
        <>
            <Link to={props.download.url} target="_blank"
                  className={
                      quality > 1080
                          ? "download bg--purple"
                          : quality > 720
                              ? `download bg--blue`
                              : `download bg--red`}
                  download>
                <div className={"download__info flex__between"}>
                    타입 <b>{props.download.type}</b>
                </div>
                <div className={"download__info flex__between"}>
                    피어 <b>{props.download.peers}</b>
                </div>
                <div className={"download__info flex__between"}>
                    시드 <b>{props.download.seeds}</b>
                </div>
                <div className={"download__info flex__between"}>
                    화질 <b>{props.download.quality}</b>
                </div>
                <div className={"download__info flex__between"}>
                    크기 <b>{props.download.size}</b>
                </div>
                <div className={"download__info flex__between"}>
                    업로드일 <b>{props.download.date_uploaded}</b>
                </div>


                {/*{props.download.url}*/}
            </Link>
        </>
    )
}

export default Download;