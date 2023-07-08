import Title from "../components/Title";
import { useContext } from "react";
import makeRequest from "../services/makeRequest";
import { useQuery } from "@tanstack/react-query";
import Post from "../components/posts/Post";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/footers/Footer";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import { scroll } from "../utils/scroll";

const PostSearch = () => {
  const { searchValue } = useContext(AuthContext);

  const { isLoading, data, error } = useQuery(["search", searchValue], () =>
    makeRequest
      .get(`/posts/search?title=${searchValue}`)
      .then((res) => res.data.posts)
  );

  return (
    <div className="ps">
      {searchValue !== "" && (
        <div
          className="psContainer"
          style={{ maxWidth: "1070px", margin: "0 auto" }}
        >
          <Title title={`Search for ${searchValue}`} />
          <div className="psList" style={{ marginBottom: "100px" }}>
            {isLoading ? (
              <Loading />
            ) : error ? (
              <p>Somethings went wrong...</p>
            ) : data.length < 1 ? (
              <p>Not search results. Please try again</p>
            ) : (
              data.map((post) => (
                <Link
                  key={post._id}
                  className="link"
                  to={`/posts/${post.title}/${post._id}`}
                  onClick={scroll}
                >
                  <Post post={post} />
                </Link>
              ))
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostSearch;
