import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import Post from "../components/posts/Post";
import Title from "../components/Title";

const PostSaved = () => {
  const { currentUser } = useContext(AuthContext);
  const { isLoading, data, error } = useQuery(
    ["bookmarks", currentUser.userId],
    () =>
      makeRequest
        .get(`/users/${currentUser.userId}/saved`)
        .then((res) => res.data.posts)
  );

  return (
    <div className="ps">
      <div
        className="psContainer"
        style={{ maxWidth: "1070px", margin: "0 auto" }}
      >
        <Title title="Posts saved" />
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Somethings went wrong...</p>
        ) : data?.length < 1 ? (
          <p>You don't have post saved.</p>
        ) : (
          data?.map((post) => (
            <Link
              className="link"
              to={`/posts/${post.title}/${post._id}`}
              key={post._id}
            >
              <Post post={post} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default PostSaved;
