import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

const Register = () => {
  const { setLoading, loading, register } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar);

    setLoading(true);
    await register(formData);

    setLoading(false);
    navigate("/");
  };

  if (loading) return <Loading />;

  return (
    <div className="register">
      <div className="container">
        <h2>Welcome to Sun !!!</h2>
        <form>
          <div className="register-form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
          </div>
          <div className="register-form-group">
            <input
              type="file"
              placeholder="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
            {avatar && <img src={URL.createObjectURL(avatar)} alt="" />}
          </div>
        </form>
        <div className="btns">
          <button onClick={handleRegister}>Register</button>
          <Link to="/login" className="link">
            <button>Login</button>
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
      </div>
    </div>
  );
};

export default Register;
