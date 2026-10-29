import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [error, setError] = useState("");

  const favorites = useSelector((state) => state.favorites);
  const API_KEY = "YOUR_TMDB_API_KEY";

  useEffect(() => {
    async function getDetails() {
      setMovie(null);
      setError("");

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          { params: { api_key: API_KEY } },
        );

        setMovie(response.data);

        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          { params: { api_key: API_KEY } },
        );

        setCast(castResponse.data.cast.slice(0, 5));
      } catch (err) {
        setError("Movie details load nahi hui.");
      }
    }

    getDetails();
  }, [id]);

  if (error) {
    return <p className="container text-danger mt-4">{error}</p>;
  }

  if (!movie) {
    return <p className="container mt-4">Loading details...</p>;
  }

  const added = favorites.some((item) => item.id === movie.id);

  function toggleFavorite() {
    if (added) {
      dispatch({
        type: "REMOVE_FAVORITE",
        payload: movie.id,
      });
    } else {
      dispatch({
        type: "ADD_FAVORITE",
        payload: movie,
      });
    }
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          {movie.poster_path && (
            <img
              className="img-fluid rounded"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          )}
        </div>

        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p>
            <b>Rating:</b> {movie.vote_average}
          </p>
          <p>
            <b>Language:</b> {movie.original_language}
          </p>
          <p>
            <b>Release Date:</b> {movie.release_date}
          </p>
          <p>
            <b>Genre:</b> {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p>
            <b>Description:</b> {movie.overview}
          </p>
          <p>
            <b>Cast:</b> {cast.map((person) => person.name).join(", ")}
          </p>

          <button className="btn btn-success" onClick={toggleFavorite}>
            {added ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
