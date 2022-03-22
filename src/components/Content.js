import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "../routes/Home";
import Header from "./Header";
import Browse from "../routes/Browse";
import Search from "../routes/Search";
import Detail from "../routes/Detail";


function Content() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/browse"} element={<Browse />} />
                <Route path={"/search"} element={<Search />} />
                <Route path={"/search/:query"} element={<Search />} />
                <Route path={`/movies/:id`} element={<Detail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Content;