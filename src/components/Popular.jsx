import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import Loader from './templates/Loader';
import Dropdown from './templates/Dropdown';
import Topnav from './templates/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './templates/Cards';

const Popular = () => {
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = `Popular - ${category.toUpperCase()}`;

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const refreshHandler = () => {
    setpage(1);        // ✅ reset page
    setpopular([]);    // ✅ clear old data
    sethasMore(true);
  };

  useEffect(() => {
    GetPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();

  return popular.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto bg-[#1F1E24]">
      
      {/* Header Controls */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between px-5 md:px-10 gap-4 py-4">
        
        {/* Back + Title */}
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          ></i>
          Popular
        </h1>

        {/* Search Bar */}
        <div className="w-full md:w-full">
          <Topnav />
        </div>

        {/* Category Dropdown */}
        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
      </div>

      {/* Infinite Scroll Cards */}
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400">Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader />
  );
};

export default Popular;
