import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import {useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";
import "../_movies.scss"
import "../_search.scss"

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

    // useForm
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        console.log((`
            https://yts.mx/api/v2/list_movies.json?
            query_term=${data.queryTerm}&
            quality=${data.quality}&
            with_rt_ratings=true
            `))
        let result = await (
            await fetch(`
            https://yts.mx/api/v2/list_movies.json?
            query_term=${data.queryTerm}&
            quality=${data.quality}&
            page=1&
            limit=20&
            with_rt_ratings=true
            `)
        ).json()
        console.log(result)
        setSearchResult(result.data)
    }

    useEffect(() => {
        console.log(searchResult)
    }, [searchResult])

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover cover-search flex__column flex__center">
                            <form onSubmit={handleSubmit(onSubmit)}
                                  className={"search"}>
                                <label className={"search__label"}>검색어</label>
                                <input className={"search__input"}
                                       {...register("queryTerm")} />
                                <label className={"search__label"}>최소 평점</label>
                                <select className={"search__input"}
                                        {...register("minimumRating")}>
                                    <option value="">해당 없음</option>
                                    {[...Array(10)].map((_, i)=>i)
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
                                <input type="submit" className={"search__submit"} value={"검색"} />
                            </form>
                            <h1>검색 결과: {searchResult.movie_count
                                ? searchResult.movie_count: 0}개의 영화</h1>
                        </div>
                        {searchResult.movie_count
                            ? <Movies movies={searchResult.movies}/>
                            : <h2 className={"flex__center"}>검색 조건을 바꿔봐요!</h2>}
                    </section>
                </>
            }
        </>

    )
}

export default Search;