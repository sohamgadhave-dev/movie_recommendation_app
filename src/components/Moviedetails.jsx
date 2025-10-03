import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "./store/actions/movieActions";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/Loader";
import HorizontalCards from "./templates/HorizontalCards";
import noImage from "/noImage.jpg";

const Moviedetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id, dispatch]);

  const formatRuntime = (mins) => {
    if (!mins) return "N/A";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h > 0 ? `${h}h ` : ""}${m}m`;
  };

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.9)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "top 10%",
        backgroundSize: "cover",
      }}
      className="w-screen min-h-screen px-[5%] md:px-[10%] relative overflow-y-auto"
    >
      {/* Top Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-6 text-xl">
        <button
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] transition-colors"
        >
          <i className="ri-arrow-left-line"></i>
        </button>

        {info.detail.homepage && (
          <a target="_blank" href={info.detail.homepage} rel="noreferrer">
            <i className="ri-external-link-fill"></i>
          </a>
        )}
        {info.externalid?.wikidata_id && (
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            rel="noreferrer"
          >
            <i className="ri-global-line"></i>
          </a>
        )}
        {info.externalid?.imdb_id && (
          <a
            target="_blank"
            href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
            rel="noreferrer"
            className="uppercase font-semibold"
          >
            IMDb
          </a>
        )}
      </nav>

      {/* Poster + Details */}
      <div className="w-full flex flex-col md:flex-row gap-8 mt-5">
        <img
          className="w-full md:w-[25%] h-[50vh] object-cover rounded-lg shadow-lg"
          src={
            info.detail.poster_path || info.detail.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${
                  info.detail.poster_path || info.detail.backdrop_path
                }`
              : noImage
          }
          alt={info.detail.title || "poster"}
        />

        <div className="flex flex-col gap-3 text-white md:w-[70%]">
          <h1 className="text-3xl md:text-5xl font-black">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}
          </h1>

          <p className="text-lg text-zinc-300 font-semibold">
            {info.detail.release_date
              ? new Date(info.detail.release_date).getFullYear()
              : "N/A"}
          </p>

          {info.detail.release_date && (
            <p className="text-sm text-zinc-400">
              {info.detail.release_date}
            </p>
          )}

          {info.detail.runtime && (
            <p className="text-sm font-semibold text-zinc-300 border border-white w-fit rounded px-2 py-1">
              {formatRuntime(info.detail.runtime)}
            </p>
          )}

          {info.detail.tagline && (
            <p className="mt-2 text-xl italic text-zinc-200">
              "{info.detail.tagline}"
            </p>
          )}

          <h2 className="mt-4 text-2xl font-bold">Overview</h2>
          <p className="text-md leading-relaxed text-zinc-200">
            {info.detail.overview || "No overview available."}
          </p>

          {/* Trailer Button */}
          <Link
            to={`${pathname}/trailer`}
            className="mt-5 inline-block bg-[#6556CD] px-6 py-3 rounded-lg text-white font-semibold hover:bg-[#7a6bdb] transition"
          >
            ▶ Watch Trailer
          </Link>
        </div>
      </div>

      {/* Recommendations */}
      <hr className="border-zinc-700 my-6" />
      <h2 className="text-2xl font-semibold text-white mb-4">
        Recommendations & Similar
      </h2>
      <HorizontalCards
        data={
          info.recommendations.length ? info.recommendations : info.similar
        }
      />

      {/* Nested Routes (like trailer page) */}
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};

export default Moviedetails;
