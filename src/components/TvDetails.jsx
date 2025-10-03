import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "./store/actions/tvActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/loader";
import HorizontalCards from "./templates/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
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
      className="w-screen min-h-screen px-[10%] relative overflow-y-auto"
    >
      {/* Top Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        {info.detail.homepage && (
          <a target="_blank" rel="noreferrer" href={info.detail.homepage}>
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          >
            <i className="ri-global-line"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          >
            imdb
          </a>
        )}
      </nav>

      {/* Poster + Details */}
      <div className="w-full flex flex-col md:flex-row mt-4 gap-6">
        <img
          className="h-[40vh] md:h-[60vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt={info.detail.name}
        />

        <div className="content md:ml-[5%] text-white">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-black">
            {info.detail.name || info.detail.original_name}
          </h1>

          {/* Air dates */}
          <small className="text-xl font-bold text-zinc-300">
            {info.detail.first_air_date?.split("-")[0]}{" "}
            {info.detail.last_air_date &&
              `- ${info.detail.last_air_date.split("-")[0]}`}
          </small>

          {/* Runtime (per episode) */}
          {info.detail.episode_run_time?.length > 0 && (
            <h1 className="text-md font-semibold text-zinc-300 border border-white w-fit rounded p-1 mt-2">
              {info.detail.episode_run_time[0]} min / episode
            </h1>
          )}

          {/* Tagline */}
          {info.detail.tagline && (
            <h1 className="mt-2 text-2xl font-semibold italic text-zinc-200">
              {info.detail.tagline}
            </h1>
          )}

          {/* Overview */}
          <h1 className="mt-4 text-2xl md:text-3xl font-bold text-zinc-200">
            Overview
          </h1>
          <p className="text-md text-zinc-200">{info.detail.overview}</p>

          {/* Watch Trailer Button */}
          <Link
            to={`${pathname}/trailer`}
            className="mt-5 flex w-fit bg-[#6556CD] p-3 md:p-4 rounded text-white font-semibold hover:bg-[#7b6ce9] duration-300"
          >
            Watch Trailer
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <hr className="text-zinc-100 mt-6" />
      <h1 className="text-2xl font-semibold text-white mt-4">
        Recommendations & Similar Shows
      </h1>
      <HorizontalCards
        data={info.recommendations.length ? info.recommendations : info.similar}
      />

      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default TvDetails;
