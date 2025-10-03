import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "./store/actions/personActions";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "./templates/loader";
import HorizontalCards from "./templates/HorizontalCards";

const Persondetails = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  if (!info) return <Loader />;

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.95)), url(https://image.tmdb.org/t/p/original/${info.detail.profile_path})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen min-h-screen px-4 md:px-[10%] py-5 overflow-y-auto"
    >
      {/* Top Nav */}
      <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-5 text-xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      {/* Main Content */}
      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* LEFT SIDE */}
        <div className="md:w-[25%] w-full flex flex-col items-center md:items-start">
          <img
            className="h-[40vh] w-[30vh] object-cover rounded-lg shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.name}
          />

          {/* Social Links */}
          <div className="flex gap-x-5 text-2xl text-white mt-3">
            {info.externalid.wikidata_id && (
              <a
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                rel="noreferrer"
              >
                <i className="ri-global-line"></i>
              </a>
            )}
            {info.externalid.facebook_id && (
              <a
                target="_blank"
                href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                rel="noreferrer"
              >
                <i className="ri-facebook-box-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a
                target="_blank"
                href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                rel="noreferrer"
              >
                <i className="ri-instagram-line"></i>
              </a>
            )}
          </div>

          {/* Personal Info */}
          <div className="mt-5 w-full text-white">
            <h1 className="text-2xl font-semibold mb-2">Personal Info</h1>

            <div className="space-y-2 text-zinc-300">
              <p>
                <span className="font-semibold">Known For: </span>
                {info.detail.known_for_department}
              </p>
              <p>
                <span className="font-semibold">Gender: </span>
                {info.detail.gender === 2 ? "Male" : "Female"}
              </p>
              <p>
                <span className="font-semibold">Birthday: </span>
                {info.detail.birthday}
              </p>
              <p>
                <span className="font-semibold">Place of Birth: </span>
                {info.detail.place_of_birth}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:w-[75%] w-full text-white">
          <h1 className="text-4xl md:text-6xl font-black my-5">
            {info.detail.name}
          </h1>

          {/* Biography */}
          <h2 className="text-xl text-zinc-300 font-semibold">Biography</h2>
          <p className="text-zinc-300 mt-3 leading-relaxed">
            {info.detail.biography || "No biography available."}
          </p>

          {/* Works In */}
          <h2 className="text-lg text-zinc-300 font-semibold mt-8">Known For</h2>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  );
};

export default Persondetails;
