import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adem from "./assets/adem.png";
const token = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";
import type { Media } from "./entertainment-components/moviesSeries";
import { useState, useEffect } from "react";
import {
  faTv,
  faClapperboard,
  faBookmark,
  faFilm,
  faGridVertical,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
export default function App() {
  const [trending, setTrending] = useState<Media[]>([]);
  const [movies, setMovies] = useState<Media[]>([]);
  const [series, setSeries] = useState<Media[]>([]);
  const [bookmarks, setBookmarks] = useState<Media[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setisLoading] = useState(true);

  async function fetchMovies(endpoint: string) {
    setisLoading(true);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    setisLoading(false);
    return response.json();
  }
  useEffect(() => {
    const getMovies = async () => {
      const trending = await fetchMovies("/trending/all/week");
      const movies = await fetchMovies("/movie/popular");
      const series = await fetchMovies("/tv/popular");

      setTrending(trending.results);
      setMovies(movies.results);
      setSeries(series.results);
    };

    getMovies();
  }, []);
  function toggleBookmark(movie: Media) {
    setBookmarks((prev) =>
      prev.some((item) => item.id === movie.id)
        ? prev.filter((item) => item.id !== movie.id)
        : [...prev, movie],
    );
  }
  return (
    <main className="text-white lg:flex w-full">
      <header className="bg-[#000030] text-white flex lg:flex-col justify-between lg:justify-start lg:gap-15 items-center p-3 px-2 md:h-15 lg:min-h-[160vh] lg:w-17 md:rounded-xl md:m-5">
        <FontAwesomeIcon
          className="text-2xl md:text-3xl text-red-500"
          icon={faClapperboard}
        />
        <nav className="flex lg:flex-col gap-5 items-center text-xl">
          <NavLink
            className={({ isActive }) =>
              isActive ? "opacity-100" : "opacity-40"
            }
            to="/home"
          >
            <FontAwesomeIcon
              className=" pointer"
              icon={faGridVertical}
            ></FontAwesomeIcon>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "opacity-100" : "opacity-40"
            }
            to="/movies"
          >
            <FontAwesomeIcon
              className=" pointer"
              icon={faFilm}
            ></FontAwesomeIcon>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "opacity-100" : "opacity-40"
            }
            to="/series"
          >
            <FontAwesomeIcon className=" pointer" icon={faTv}></FontAwesomeIcon>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "opacity-100" : "opacity-40"
            }
            to="/bookmarks"
          >
            <FontAwesomeIcon
              className=" pointer"
              icon={faBookmark}
            ></FontAwesomeIcon>
          </NavLink>
        </nav>
        <img
          className="w-7 md:w-10 rounded-full lg:mt-auto"
          src={adem}
          alt="Profile"
        />
      </header>
      <section className="mt-12 flex flex-col gap-7 w-full min-w-0 lg:flex-1">
        <div className="relative flex items-center w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 ml-9 w-full md:w-3/5 outline-none placeholder:text-sm"
            type="search"
            placeholder="Search for movies or TV Series..."
          />
          <FontAwesomeIcon
            className="left-2 text-white/60 text-lg absolute"
            icon={faSearch}
          />
        </div>
        <Outlet
          context={{
            trending,
            movies,
            series,
            bookmarks,
            toggleBookmark,
            search,
            loading,
          }}
        />
      </section>
    </main>
  );
}
