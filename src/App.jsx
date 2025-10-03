import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/templates/Movie";   // capitalized for convention
import TvShows from "./components/TvShows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import TvDetails from "./components/TvDetails";
import Persondetails from "./components/Persondetails";
import Trailer from "./components/Trailer";

const App = () => {
  return (
    <div className="w-screen h-screen bg-[#1F1E24] flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<Moviedetails />} />
        <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/tv/details/:id" element={<TvDetails />} />
        <Route path="/tv/details/:id/trailer" element={<Trailer />} />
        <Route path="/person" element={<People />} />
        <Route path="/person/details/:id" element={<Persondetails />} />
      </Routes>
    </div>
  ); 
};

export default App;
