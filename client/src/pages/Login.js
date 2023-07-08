import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoading, loading, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    await login({ email, password });

    setLoading(false);
    navigate("/");
  };

  if (loading) return <Loading />;

  return (
    <div className="login">
      <div className="container">
        <h2>Login</h2>
        <form>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btns">
            <button onClick={handleLogin}>Login</button>
            <Link to="/register" className="link">
              <button>Register</button>
            </Link>

            <button>
              <a
                className="link"
                href="http://localhost:5000/auth/google/callback"
              >
                Continute with google
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
