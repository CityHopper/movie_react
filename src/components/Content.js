import React from "react";
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./../Home";
import Movies from "./Movies";


function Content() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>} exact/>
                <Route path={"/movies"} element={<Movies/>} exact/>
            </Routes>
        </BrowserRouter>
    )
}

export default Content;