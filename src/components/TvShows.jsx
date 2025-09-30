import React, { useEffect, useState } from 'react'
import Topnav from './templates/Topnav';
import Dropdown from './templates/Dropdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';
import Loader from './templates/loader';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';

const TvShows = () => {
  const [category, setcategory] = useState("airing_today");
    const [tv, settv] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, sethasMore] = useState(true);
    document.title = `Tv-Shows - ${category.toUpperCase()}`;

    const GetTv = async () => {
    try {
      const { data } = await axios.get(
        `/tv/${category}?page=${page}`
      );

      if (data.results.length > 0) {
        settv((prev) => [...prev, ...data.results]);
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
    settv([]);
    
    sethasMore(true);
  };

  useEffect(()=>{
    GetTv();
  },[page])

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();


  return tv.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center justify-between px-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
          ></i>
          TV-Shows
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["on_the_air","top_rated","popular", "airing_today"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
        
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={tv} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader/>
  );
};

export default TvShows;