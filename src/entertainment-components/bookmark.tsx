import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faFilm } from "@fortawesome/free-solid-svg-icons";
import { useOutletContext } from "react-router-dom";
import type { Media } from "./moviesSeries";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
export function Bookmark() {
  const { bookmarks, toggleBookmark, search } = useOutletContext<{
    bookmarks: Media[];
    toggleBookmark: (movie: Media) => void;
    search: string;
  }>();
  const filterBookmark = bookmarks.filter((book) =>
    (book.title || book.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <section className="flex flex-col gap-7">
      <h2 className="text-xl font-semibold capitalize">
        Bookmarked Movies or Tv series
      </h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {filterBookmark.map((mov) => {
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
    </section>
  );
}
