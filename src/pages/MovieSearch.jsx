import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MovieSearch() {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "YOUR_TMDB_API_KEY";

  async function searchMovie(e) {
    e.preventDefault();

    if (name.trim() === "") {
      setError("Movie name enter karein.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: API_KEY,
            query: name,
          },
        },
      );

      setMovies(response.data.results);

      if (response.data.results.length === 0) {
        setError("Koi movie nahi mili.");
      }
    } catch (err) {
      setError("Search nahi hua. API key check karein.");
    }

    setLoading(false);
  }

  return (
    <div className="container py-4">
      <h2>Search Movies</h2>

      <form onSubmit={searchMovie} className="d-flex gap-2 mb-4">
        <input
          className="form-control"
          type="text"
          placeholder="Enter movie name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn btn-primary">Search</button>
      </form>

      {loading && <p>Searching...</p>}
      {error && <p>{error}</p>}

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 col-sm-6 mb-4" key={movie.id}>
            <div className="card movie-card h-100">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              )}

              <div className="card-body">
                <h5>{movie.title}</h5>

                <Link to={`/movie/${movie.id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieSearch;
