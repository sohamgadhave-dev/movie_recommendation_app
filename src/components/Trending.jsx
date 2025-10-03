import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import Loader from './templates/Loader';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = `Trending - ${category}`;

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
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
    settrending([]);
    sethasMore(true);
  };

  useEffect(() => {
    GetTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  const navigate = useNavigate();

  return trending.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto bg-[#1F1E24]">
      
      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-5 md:px-10 gap-4 py-4">
        
        {/* Back + Title */}
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Trending
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-full">
          <Topnav />
        </div>

        {/* Dropdowns */}
        <Dropdown
          title="Category"
          options={["all", "movie", "tv"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />

        <Dropdown
          title="Duration"
          options={["week", "day"]}
          selected={duration}
          func={(e) => setduration(e.target.value)}
        />
      </div>

      {/* Infinite Scroll Cards */}
      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
