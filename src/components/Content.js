import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../routes/Home";
import Movies from "./Movies";
import Detail from "../routes/Detail";
import Header from "./../components/Header";


function Content() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/movies"} element={<Movies/>} />
                <Route path={"/movies/:id"} element={<Detail/>} />
            </Routes>
        </Router>
    )
}

export default Content;