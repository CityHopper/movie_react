import React, {useCallback, useEffect, useState, useMemo} from "react";
import Movies from "../components/Movies"
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import Pagination from "../components/Pagination";
import "../_movies.scss";
import "../_search.scss";
import "../_pagination.scss";

function Search() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [searchResult, setSearchResult] = useState([])

    // https://yts.mx/api/v2/list_movies.json?quality=3D
    useEffect(() => {
        console.log(location)
        if (location.state) {
            setLoading(true)
            setSearchResult(location.state.data)
            setLoading(false);
        }
    }, [location])

    // Pagination
    let pageSize = 20;
    const [currentPage, setCurrentPage] = useState(1);

    // useForm
    const {register, handleSubmit, getValues, formState: {errors}} = useForm();
    const onSubmit = async (data) => {
        let result = await (
            await fetch(`
            https://yts.mx/api/v2/list_movies.json?
            query_term=${data.queryTerm}&
            quality=${data.quality}&
            sort_by=${data.sortBy}&
            order_by=${data.orderBy}&
            page=${currentPage}&
            limit=${pageSize}&
            with_rt_ratings=true
            `)
        ).json()

        setSearchResult(result.data)
    }

    useEffect(() => {
        if (getValues("queryTerm")) {
            onSubmit(getValues());
        }
    }, [currentPage])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [searchResult])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover bg--gray flex__column flex__end">
                            <form onSubmit={handleSubmit(onSubmit)}
                                  className={"search"}>
                                <label className={"search__label"}>검색어</label>
                                <input className={"search__input"}
                                       {...register("queryTerm",
                                           {required: "검색어(필수)를 입력해주세요."})} />
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
                        {searchResult.movie_count
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
            }
        </>

    )
}

export default Search;