import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import axios from "../../utils/axios";
import Cards from "./templates/Cards";
import Loader from "./templates/loader";
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = `Trending - ${category}`;

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );

      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
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
    settrending([]);
    
    sethasMore(true);
  };

  useEffect(()=>{
    GetTrending();
  },[page])

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  const navigate = useNavigate();

  return trending.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center justify-between px-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
          ></i>
          Trending
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["all", "movie", "tv"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
        <div>""</div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          selected={duration}
          func={(e) => setduration(e.target.value)}
        />
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Trending;
