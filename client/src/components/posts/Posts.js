import { useContext } from "react";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../Loading";
import { scroll } from "../../utils/scroll";

const Posts = ({ isLoading, error, posts }) => {
  const navigate = useNavigate();
  const { page, setPage, cat } = useContext(AuthContext);

  const handleLink = (type, page) => {
    type === "next" ? setPage((page) => page + 1) : setPage((page) => page - 1);
    navigate(`/posts?page=${page}&cat=${cat}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="posts">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>Something went wrong...</p>
      ) : (
        posts?.map((post) => (
          <Link
            key={post._id}
            to={`/posts/${post.title}/${post._id}`}
            className="link"
            onClick={scroll}
          >
            <Post post={post} />
          </Link>
        ))
      )}
      {page > 0 && (
        <button className="prevPage" onClick={() => handleLink("prev", page)}>
          Prev Page
        </button>
      )}
      {posts?.length >= 9 && (
        <button className="nextPage" onClick={() => handleLink("next", page)}>
          Next Page
        </button>
      )}
    </div>
  );
};

export default Posts;
