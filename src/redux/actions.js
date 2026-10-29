export const fetchPopularMovies = () => {
  return async (dispatch) => {
    dispatch({ type: "LOADING" });

    try {
      const response = await fetch(
        "https://api.anyplay.stream/v1/movies?pageNo=1",
      );

      if (!response.ok) {
        throw new Error("Movie API failed");
      }

      const data = await response.json();

      dispatch({
        type: "SUCCESS",
        payload: data.results.map((movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          vote_average: 0,
          overview: "",
          release_date: "",
        })),
      });
    } catch (error) {
      console.error(error);

      dispatch({
        type: "ERROR",
        payload: "Movies load nahi hui. Thodi der baad try karein.",
      });
    }
  };
};
