import React, { useEffect, useState } from "react";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import Cards from "./templates/Cards";
import Loader from "./templates/loader";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const TvShows = () => {
  const [category, setcategory] = useState("airing_today");
  const [tv, settv] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = `TV Shows - ${category.toUpperCase()}`;

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
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
    settv([]);           
    sethasMore(true);    
  };

  useEffect(() => {
    GetTv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();

  return tv.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto bg-[#1F1E24]">
      
      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-5 md:px-10 gap-4 py-4">
        
        {/* Back + Title */}
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          TV Shows
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-full">
          <Topnav />
        </div>

        {/* Dropdown */}
        <Dropdown
          title="Category"
          options={["on_the_air", "top_rated", "popular", "airing_today"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      {/* Infinite Scroll */}
      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default TvShows;
