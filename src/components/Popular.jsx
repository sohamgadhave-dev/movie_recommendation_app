import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import Loader from './templates/loader';
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
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
      );

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
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
    setpopular([]);
    
    sethasMore(true);
  };

  useEffect(()=>{
    GetPopular();
  },[page])

  useEffect(() => {
    refreshHandler();
  }, [category]);

  const navigate = useNavigate();


  return popular.length > 0 ? (
    <div className="w-screen h-screen overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center justify-between px-10">
        <h1 className="text-2xl text-zinc-400 font-semibold flex items-center gap-2">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
          ></i>
          Popular
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv"]}
          selected={category}
          func={(e) => setcategory(e.target.value)}
        />
        
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loader/>
  );
};

export default Popular;