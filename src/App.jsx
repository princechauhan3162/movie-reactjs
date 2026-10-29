import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

import MovieList from "./pages/MovieList.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import MovieSearch from "./pages/MovieSearch.jsx";
import Login from "./pages/Login.jsx";
import Favorites from "./pages/Favorites.jsx";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <BrowserRouter>
      <Navbar login={login} setLogin={setLogin} />

      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/search" element={<MovieSearch />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route path="/login" element={<Login setLogin={setLogin} />} />

        <Route
          path="/favorites"
          element={
            <PrivateRoute login={login}>
              <Favorites />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<h2 className="container mt-4">Page Not Found</h2>}
        />
      </Routes>

      <footer className="footer">Movie Library | React JS Project</footer>
    </BrowserRouter>
  );
}

export default App;
