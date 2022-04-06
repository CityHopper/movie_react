import {useState} from "react";
import "./../_about.scss";

export default function About() {
    const qna = [
        {
            question: `리액트무비는 어떤 서비스인가요?`,
            answer: `리액트무비는 재미삼아 만든 영화 정보 반응형 웹 서비스입니다. React.js를 기반으로 합니다.`
        },
        {
            question: `어떤 서비스를 제공하나요?`,
            answer: `영화 소개, 검색, 토렌트 다운로드 기능 등을 제공합니다. 제공되는 토렌트 파일을 통해 영화를 다운로드 할 경우, 이후 저작권 관련 문제를 책임지지 않습니다.`
        },
        {
            question: `어떤 API를 사용했나요?`,
            answer: <>
                <button onClick={() => window.open("https://yts.mx/api")}>
                    이 링크
                </button>
                를 참고하세요.</>
        },
        {
            question: `소스는 어디에 있나요?`,
            answer: `깃허브에 있답니다.`
        },
    ];

    const [dropdowns, setDropdowns] = useState(Array(qna.length).fill(false));

    function toggleDropdown(num) {
        setDropdowns(dropdowns.map((item, index) => (
            index === num ? !item : item
        )))
    }

    return (
        <section className={"container"}>
            <div className="cover bg--blue flex__center">
                <h1 className={"cover__title"}>
                    <span className={"logo"}>ReactMovie</span>를 소개합니다.
                </h1>
            </div>
            <section className={"about"}>
                {qna.map((item, index) => (
                    <article>
                        <button className={"about__q bg--gray flex__between"}
                                onClick={() => toggleDropdown(index)}>
                            <h2>{item.question}</h2>
                            <div className="arrow arrow--down"/>
                        </button>
                        <p className={dropdowns[index] ? "about__a active" : "about__a"}>
                            {item.answer} </p>
                    </article>
                ))}
            </section>
        </section>
    )
}