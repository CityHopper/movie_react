import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "../routes/Home";
import Header from "./Header";
import Latest from "../routes/Latest";
import Search from "../routes/Search";
import Detail from "../routes/Detail";
import About from "../routes/About";


function Content() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/latest"} element={<Latest />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={"/search/:query"} element={<Search />} />
                <Route path={`/movies/:id`} element={<Detail />} />
                <Route path={`/about`} element={<About />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Content;