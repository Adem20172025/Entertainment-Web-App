import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFilm } from "@fortawesome/free-solid-svg-icons";
import type { Media } from "./moviesSeries";
import { useOutletContext } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export function MovieData() {
  const { movies, toggleBookmark, bookmarks, search } = useOutletContext<{
    movies: Media[];
    toggleBookmark: (movie: Media) => void;
    bookmarks: Media[];
    search: string;
  }>();
  const filteredMovies = movies.filter((mov) =>
    (mov.title || "").toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {filteredMovies.map((mov) => {
        return (
          <article className="flex flex-col" key={mov.id}>
            <div
              style={{
                backgroundImage: `url(${IMAGE_URL}${mov.poster_path})`,
              }}
              className="bg-cover bg-center bg-no-repeat shrink-0 rounded-lg overflow-hidden min-h-30 md:min-h-50 relative"
            >
              <button
                onClick={() => toggleBookmark(mov)}
                className="absolute right-1 top-1 bg-[rgba(0,0,0,0.2)] p-1 rounded-full size-9 cursor-pointer text-black text-xl"
              >
                <FontAwesomeIcon
                  className={
                    bookmarks.some((item) => item.id === mov.id)
                      ? "text-white"
                      : "text-black"
                  }
                  icon={faBookmark}
                />
              </button>
            </div>
            <div className="flex items-center text-sm mt-2 gap-2">
              <p className="text-white/60">{mov.release_date?.slice(0, 4)}</p>
              <ul className="flex gap-2">
                <li className="text-white/60 ">
                  <FontAwesomeIcon icon={faFilm} />
                  {mov.media_type}
                </li>
                <li className="text-white/60 uppercase">pg</li>
              </ul>
            </div>
            <p className="capitalize">{mov.title || mov.name}</p>
          </article>
        );
      })}
    </section>
  );
}
