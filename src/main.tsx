import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Movies } from "./entertainment-components/moviesSeries.tsx";
import { MovieData } from "./entertainment-components/movies.tsx";
import { SerieData } from "./entertainment-components/series.tsx";
import { Bookmark } from "./entertainment-components/bookmark.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Movies />} />
          <Route path="home" element={<Movies />} />
          <Route path="movies" element={<MovieData />} />
          <Route path="series" element={<SerieData />} />
          <Route path="bookmarks" element={<Bookmark />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
