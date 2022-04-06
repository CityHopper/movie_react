import React, {useEffect, useState, useMemo} from "react";
import Movies from "../components/Movies";
import {useLocation, useNavigate, createSearchParams, useSearchParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import Pagination from "../components/Pagination";
import "../_movies.scss";
import "../_search.scss";
import "../_pagination.scss";

function Search() {
    const [loading, setLoading] = useState(false);
    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "Film-Noir",
        "History",
        "Horror",
        "Music",
        "Musical",
        "Mystery",
        "Romance",
        "Sci-Fi",
        "Short-Film",
        "Sport",
        "Superhero",
        "Thriller",
        "War",
        "Western"
    ]

    // useForm
    const {register, handleSubmit, getValues, setValue, formState: {errors}} = useForm();

    // URL 내 검색 쿼리 조회 함수
    function useQuery() {
        const {search} = useLocation();
        return useMemo(() => new URLSearchParams(search), [search])
    }

    let query = useQuery();

    const getSearchResult = async () => {
        setLoading(true);
        let queryPair = {
            query_term: query.get("queryTerm"),
            genre: query.get("genre"),
            minimum_rating: query.get("minimumRating"),
            quality: query.get("quality"),
            sort_by: query.get("sortBy"),
            order_by: query.get("orderBy"),
            page: query.get("page"),
            width_rt_ratings: true,
            limit: pageSize
        };

        for (let i in queryPair) {
            queryPair[i] === null && delete queryPair[i]
        }

        let result = await (
            await fetch(`
            https://yts.mx/api/v2/list_movies.json?
            ${createSearchParams(queryPair).toString()}
            `)
        ).json();
        setSearchResult(result.data);
        setLoading(false);
    }

    // URL 내 검색 query 변경될 때마다 검색 실행 및 form 변경
    const location = useLocation();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (query.get("queryTerm")) {
            getSearchResult()
        }
        for (const entry of searchParams.entries()) {
            const [param, value] = entry;
            setValue(param, value);
        }
    }, [location.search])

    // 검색 버튼 onSubmit
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        setCurrentPage(1);
        data.page = 1;
        for (let i in data) {
            data[i] === '' && delete data[i]
        }
        navigate({
            // pathname: "search",
            search: createSearchParams(data).toString()
        });
    }

    // Pagination
    let pageSize = 20;
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        let currentParams = Object.fromEntries([...searchParams]);
        currentParams.page = currentPage;
        console.log(currentParams);
        navigate({search: createSearchParams(currentParams).toString()})
    }, [currentPage])

    // 검색 결과
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchResult])

    return (
        <>
            <section className="container">
                <div className="cover bg--gray flex__column flex__end">
                    <form onSubmit={handleSubmit(onSubmit)}
                          className={"search"}>
                        <label className={"search__label"}>검색어</label>
                        <input className={"search__input"}
                               {...register("queryTerm",
                                   {required: "검색어(필수)를 입력해주세요."})} />
                        <label className={"search__label"}>장르</label>
                        <select className={"search__input"}
                                {...register("genre")}>
                            <option value={""}>해당 없음</option>
                            {genres.map((genre, id) =>
                                <option value={genre} key={id}>{genre}</option>
                            )}
                        </select>
                        <label className={"search__label"}>최소 평점</label>
                        <select className={"search__input"}
                                {...register("minimumRating")}>
                            <option value="">해당 없음</option>
                            {[...Array(10)].map((_, i) => i)
                                .map((int, key) => (
                                    <option value={`${int}`} key={key}>{int}</option>
                                ))}
                        </select>
                        <label className={"search__label"}>화질</label>
                        <select className={"search__input"}
                                {...register("quality")}>
                            <option value="">해당 없음</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="2160p">2160p</option>
                            <option value="3D">3D</option>
                        </select>
                        <label className={"search__label"}>정렬 기준</label>
                        <select className={"search__input"}
                                {...register("sortBy")}>
                            <option value="date_added">추가된 날짜</option>
                            <option value="title">제목</option>
                            <option value="year">개봉연도</option>
                            <option value="rating">평점</option>
                            <option value="peers">피어</option>
                            <option value="seeds">시드</option>
                            <option value="download_count">다운로드 수</option>
                            <option value="like_count">좋아요 수</option>
                        </select>
                        <label className={"search__label"}>차순</label>
                        <select className={"search__input"}
                                {...register("orderBy")}>
                            <option value="desc">내림차순</option>
                            <option value="asc">오름차순</option>
                        </select>
                        <input type="submit" className={"search__submit bg--black"} value={"검색"}/>
                    </form>
                    <h1>검색 결과: {searchResult.movie_count
                        ? searchResult.movie_count : 0}개의 영화</h1>
                </div>
                {errors.queryTerm
                    && <div className={"search__error flex__center bg--red"}>
                        {errors.queryTerm.message}</div>
                }
                <div className={"bg--blue flex__center"}>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={searchResult.movie_count || 0}
                        pageSize={pageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
                {loading
                    ? <h1 className="flex__center">Loading...</h1>
                    : searchResult.movie_count
                        ? <Movies movies={searchResult.movies}/>
                        : <h2 className={"flex__center"}>{"원하는 영화를 검색해보세요!"}</h2>
                }
                <div className={"bg--blue flex__center"}>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={searchResult.movie_count || 0}
                        pageSize={pageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </section>
        </>

    )
}

export default Search;