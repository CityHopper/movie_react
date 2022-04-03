import "./../_about.scss";

export default function About () {
    return (
        <section className={"container"}>
            <div className="cover bg--red flex__center">
                <h1 className={"cover__title"}>
                    <span className={"logo"}>ReactMovie</span>를 소개합니다.
                </h1>
            </div>
            <article className={"about"}>
                <button className={"about__dropdown"}>
                    Q. 리액트무비는 어떤 서비스인가요?
                    <div className="arrow arrow--down" />
                </button>
            </article>
        </section>
    )
}