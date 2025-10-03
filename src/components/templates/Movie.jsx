import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "../../../utils/axios";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import Loader from "./Loader";

const Movie = () => {
  const [category, setcategory] = useState("now_playing");
  const [movie, setmovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `Movies - ${category.toUpperCase()}`;

  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`);
      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);          
    setmovie([]);        
    sethasMore(true);    
  };

  useEffect(() => {
    GetMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();

  return movie.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto bg-[#1F1E24]">
      
      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-5 md:px-10 gap-4 py-4">
        
        {/* Back Button + Title */}
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Movies
        </h1>

        {/* Search */}
        <div className="w-full md:w-full">
          <Topnav />
        </div>

        {/* Dropdown */}
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      {/* Infinite Scroll Cards */}
      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovies}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;
