const initialState = {
  movies: [],
  loading: false,
  error: "",
  favorites: [],
};

function movieReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
        error: "",
      };

    case "SUCCESS":
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: "",
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_FAVORITE":
      if (state.favorites.some((movie) => movie.id === action.payload.id)) {
        return state;
      }

      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter(
          (movie) => movie.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}

export default movieReducer;
