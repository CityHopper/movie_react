import React, {useCallback, useEffect, useState} from "react";
import Movies from "../components/Movies"
import {useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";
import "../_movies.scss"
import "../_search.scss"

function Search() {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([])

    // https://yts.mx/api/v2/list_movies.json?quality=3D
    useEffect(() => {
        console.log(location)
        if (location.state) {
            setLoading(true)
            setMovies(location.state.data.movies)
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
            with_rt_ratings=true
            `)
        ).json()
        setMovies(result.data.movies)
    }

    return (
        <>
            {loading
                ? (<h1 className="loading flex__center">Loading...</h1>)
                :
                <>
                    <section className="container">
                        <div className="cover cover-search flex__center">
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
                        </div>
                        {movies.length
                            ? <Movies movies={movies}/>
                            : <h2 className={"flex__center"}>결과가 없습니다.</h2>}
                    </section>
                </>
            }
        </>

    )
}

export default Search;