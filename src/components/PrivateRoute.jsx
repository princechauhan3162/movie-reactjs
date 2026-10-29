import { Navigate } from "react-router-dom";

function PrivateRoute({ login, children }) {
  if (login) {
    return children;
  }

  return <Navigate to="/login" replace />;
}

export default PrivateRoute;
