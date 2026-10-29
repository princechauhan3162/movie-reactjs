import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchPopularMovies } from "../redux/actions.js";

function MovieList() {
  const dispatch = useDispatch();

  const movies = useSelector((state) => state.movies);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <h2>Popular Movies</h2>

      {loading && <p>Loading movies...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-3 col-sm-6 mb-4" key={movie.id}>
            <div className="card movie-card h-100">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              ) : (
                <div className="no-poster">No Poster</div>
              )}

              <div className="card-body">
                <h5>{movie.title}</h5>
                <p>Rating: {movie.vote_average}</p>

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

export default MovieList;
