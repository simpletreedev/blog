import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import "./styles/index.scss";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import NewPost from "./pages/NewPost";
import PostDetails from "./pages/PostDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import PostSearch from "./pages/PostSearch";
import PostSaved from "./pages/PostSaved";
import Sub from "./components/Sub";
import Navigation from "./components/nav/Navigation";
import ContactUs from "./components/ContactUs";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const emailBoxRef = useRef();

  const PrivateRoute = () => {
    return currentUser?.accessToken ? <Outlet /> : <Navigate to="/login" />;
  };

  const scrollToEmailBox = () => {
    window.scrollTo({
      behavior: "smooth",
      top: emailBoxRef.current?.offsetTop,
    });
  };

  return (
    <BrowserRouter>
      <Sub />
      <NavBar scrollToEmailBox={scrollToEmailBox} />
      {currentUser?.accessToken && <Navigation />}
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home emailBoxRef={emailBoxRef} />} />
          <Route
            path="/posts"
            element={<PostPage emailBoxRef={emailBoxRef} />}
          />
          <Route path="/users/:userId" element={<Profile />} />
          <Route path="/users/:userId/edit" element={<EditProfile />} />
          <Route path="/posts/search" element={<PostSearch />} />
          <Route path="/users/:userId/notification" />
          <Route path="/posts/new" element={<NewPost />} />
          <Route path="/posts/saved" element={<PostSaved />} />
          <Route
            path="/posts/:titleUrl/:postId"
            element={<PostDetails emailBoxRef={emailBoxRef} />}
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/posts/:titleUrl/:postId/edit" />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
