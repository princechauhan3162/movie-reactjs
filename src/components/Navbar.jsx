import { Link, useNavigate } from "react-router-dom";

function Navbar({ login, setLogin }) {
  const navigate = useNavigate();

  function logout() {
    setLogin(false);
    navigate("/");
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">
        Movie Library
      </Link>

      <div>
        <Link to="/" className="btn btn-light m-1">
          Home
        </Link>

        <Link to="/search" className="btn btn-light m-1">
          Search
        </Link>

        {login && (
          <Link to="/favorites" className="btn btn-warning m-1">
            Favorites
          </Link>
        )}

        {login ? (
          <button className="btn btn-danger m-1" onClick={logout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="btn btn-primary m-1">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
