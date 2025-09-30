import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "./store/actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/loader";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetails = () => {
  const {pathname} =  useLocation();
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.tv);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(asyncloadtv(id));
      return () => {
        dispatch(removetv());
      };
    }, [id]);
  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-screen h-screen px-[10%] relative overflow-y-hidden"
    >
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl  ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line" // ✅ fixed
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i class="ri-global-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* part 2 poster and details */}
      <div className="w-full flex ">
        <img
          className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="content ml-[5%] ">
          <h1 className="text-5xl font-black text-white">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
          </h1>
          <small className="text-3xl font-bold text-zinc-300">
            {info.detail.first_air_date.split("-")[0]}
          </small>
         <h1 className="text-md font-semibold text-zinc-300">{info.detail.release_date}</h1>
         <h1 className="text-md font-semibold text-zinc-300 border border-white w-fit rounded p-1 mt-2">{info.detail.runtime}<span>min</span></h1>
        <h1 className="mt-2 text-2xl font-semibold italic text-zinc-200">{info.detail.tagline}</h1>
        <h1 className="mt-2 text-3xl font-bold text-zinc-200">Overview</h1>
        <h1 className=" text-md text-zinc-200">{info.detail.overview}</h1>
        <Link to={`${pathname}/trailer`} className="mt-5 flex w-fit bg-[#6556CD] p-4 rounded text-white font-semibold  ">
                Watch Trailer
              </Link>
        </div>
      </div>
      <hr className="text-zinc-100 mt-3" />
      <h1 className="text-2xl font-semibold text-white mt-3 ">Recommendations & Similar Stuff</h1>
      <HorizontalCards data = {info.recommendations.length ? info.recommendations : info.similar}/>
      <Outlet/>
      
    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails