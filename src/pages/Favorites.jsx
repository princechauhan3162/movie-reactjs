import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  function removeMovie(id) {
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: id,
    });
  }

  return (
    <div className="container py-4">
      <h2>My Watchlist</h2>

      {favorites.length === 0 && <p>No favorite movies added.</p>}

      <div className="row">
        {favorites.map((movie) => (
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

                <Link
                  to={`/movie/${movie.id}`}
                  className="btn btn-primary me-2 mb-2"
                >
                  Details
                </Link>

                <button
                  className="btn btn-danger mb-2"
                  onClick={() => removeMovie(movie.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;