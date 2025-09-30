
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "../../../utils/axios";
import Topnav from "./Topnav";
import Dropdown from "./Dropdown";
import Cards from "./Cards";
import Loader from "./loader";

const Movie = () => {
    const [category, setcategory] = useState("now_playing");

      const [movie, setmovie] = useState([]);
      const [page, setpage] = useState(1);
      const [hasMore, sethasMore] = useState(true);
      document.title = `Movie - ${category}`;

      const GetMovies = async () => {
    try {
      const { data } = await axios.get(
        `/movie/${category}?page=${page}`
      );

      if (data.results.length > 0) {
        setmovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1); //  
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(page + 1);
    setmovie([]);
    
    sethasMore(true);
  };

  useEffect(()=>{
    GetMovies();
  },[page])

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();
  return movie.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center justify-between px-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
          ></i>
          Movies
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["popular", "top_rated", "upcoming", "now_playing"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={movie.length}
        next={GetMovies}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Movie;
