import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Email aur password enter karein.");
    } else {
      setLogin(true);
      navigate("/favorites");
    }
  }

  return (
    <div className="container login-page">
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="text-center">Login</h2>

        <label>Email</label>
        <input
          type="email"
          className="form-control my-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />

        <label>Password</label>
        <input
          type="password"
          className="form-control my-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button className="btn btn-primary w-100 mt-3">Login</button>
      </form>
    </div>
  );
}

export default Login;
