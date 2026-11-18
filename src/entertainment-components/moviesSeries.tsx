import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faTv } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { MovieData } from "./movies";
import { SerieData } from "./series";
import { useOutletContext } from "react-router-dom";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export type Media = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type: "movie" | "tv" | "person";
  release_date?: string;
  first_air_date?: string;
};
export function Movies() {
  const { trending, bookmarks, toggleBookmark, search } = useOutletContext<{
    trending: Media[];
    bookmarks: Media[];
    toggleBookmark: (movies: Media) => void;
    search: string;
  }>();
  const filterTrending = trending.filter((trd) =>
    (trd.name || trd.title || "").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="mt-3 px-3 flex flex-col gap-2 mb-15">
      <section className="flex flex-col gap-1 mt-5">
        <h2 className="text-2xl">Trending</h2>
        <section className="flex rounded-lg shrink-0 overflow-x-auto gap-3 scrollbar-hide scroll-smooth mt-3">
          {filterTrending.map((trd) => {
            return (
              <article
                style={{
                  backgroundImage: `url(${IMAGE_URL}${trd.poster_path})`,
                }}
                className={`flex flex-col relative rounded-lg bg-cover bg-center `}
                key={trd.id}
              >
                <div className=" p-4 min-h-33 md:min-h-45 flex flex-col justify-end w-64 md:w-100">
                  <div className="flex gap-6 items-center text-sm ">
                    <p className="text-white/60">
                      {trd.release_date?.slice(0, 4)}
                    </p>
                    <ul className="flex gap-6 list-disc">
                      <li className="text-white/60 ">
                        <FontAwesomeIcon
                          icon={trd.media_type === "tv" ? faTv : faFilm}
                        />
                        {trd.media_type}
                      </li>
                      <li className="text-white/60 uppercase">pg</li>
                    </ul>
                  </div>
                  <h2 className=" text-xl font-semibold">
                    {trd.name || trd.title}
                  </h2>
                </div>
                <button
                  onClick={() => toggleBookmark(trd)}
                  className="absolute right-1 top-1 bg-[rgba(0,0,0,0.2)] p-1 rounded-full size-9 cursor-pointer text-black text-xl"
                >
                  <FontAwesomeIcon
                    className={
                      bookmarks.some((item) => item.id === trd.id)
                        ? "text-white"
                        : "text-black"
                    }
                    icon={faBookmark}
                  />
                </button>
              </article>
            );
          })}
        </section>
      </section>
      <section className="mt-4 flex flex-col gap-4">
        <h2 className="text-2xl">Recommended for you</h2>
        <section className="flex flex-col gap-3">
          <MovieData />
          <SerieData />
        </section>
      </section>
    </section>
  );
}
