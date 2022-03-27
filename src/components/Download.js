import {Link} from "react-router-dom";
import "./../_download.scss";

function Download(props) {


    return (
        <>
            <h2>토렌트 다운로드</h2>
            <div className={"download-container"}>
                {props.torrents.sort((a, b) => parseFloat(a.size) - parseFloat(b.size))
                    .map((torrent, id) => (
                    <Link to={torrent.url} target="_blank"
                          key={id} className={
                        torrent.quality === "3D"
                            ? "download bg--green"
                            : torrent.quality.slice(0, -1) > 1080
                                ? "download bg--purple"
                                : torrent.quality.slice(0, -1) > 720
                                    ? `download bg--blue`
                                    : `download bg--red`}
                          download>
                        <div className={"download__info flex__between"}>
                            타입 <b>{torrent.type}</b>
                        </div>
                        <div className={"download__info flex__between"}>
                            피어 <b>{torrent.peers}</b>
                        </div>
                        <div className={"download__info flex__between"}>
                            시드 <b>{torrent.seeds}</b>
                        </div>
                        <div className={"download__info flex__between"}>
                            화질 <b>{torrent.quality}</b>
                        </div>
                        <div className={"download__info flex__between"}>
                            크기 <b>{torrent.size}</b>
                        </div>
                        <div className={"download__info flex__between"}>
                            업로드일 <b>{torrent.date_uploaded}</b>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Download;