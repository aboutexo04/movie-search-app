import React, { useState } from "react";
import "./SearchMovie.css";
export default function SearchMovie() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovie = async (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=f33a64de9684754b32d708d2b90525b5&language=en-US&query=${query}&page=1&include_adult=false`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="search-form" onSubmit={searchMovie}>
        <label className="search-label" htmlFor="query">
          Movie Name
        </label>
        <input
          id="query"
          className="search-input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>

      <div className="card-list">
        {movies.map((movie) => (
          <div key={movie.id} className="card">
            {movie.poster_path && (
              <img
                className="card-image"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <div className="card-content">
              <h2 className="card-title">{movie.title}</h2>
              <p className="card-overview">{movie.overview}</p>
              <p className="card-release-date">
                Release Date: {movie.release_date}
              </p>
              <p className="card-vote-average">
                Vote Average: {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
