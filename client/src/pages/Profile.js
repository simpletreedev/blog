import { useCallback } from "react";
import makeRequest from "../services/makeRequest";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import Post from "../components/posts/Post";
import ProfileName from "../components/ProfileName";
import Loading from "../components/Loading";
import { scroll } from "../utils/scroll";

const Profile = () => {
  const userId = useLocation().pathname?.split("/")[2];

  const getUserProfile = (userId) =>
    makeRequest.get(`/users/${userId}`).then((res) => res.data.user);

  const { isLoading, data, error } = useQuery(["users", userId], () =>
    makeRequest.get(`/users/${userId}`).then((res) => res.data.user)
  );

  useCallback(() => {
    getUserProfile(userId);
  }, [userId]);

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profileBackground"></div>

        <div className="profileCenter">
          <div className="profileLeft">
            <div className="profileAvatar">
              <img src={data?.avatar} alt="" />
            </div>
            <h2>{data?.name}</h2>
          </div>
          <Link className="link" to={`/users/${userId}/edit`}>
            <button>Edit Profile</button>
          </Link>
        </div>

        <div className="profileBottom">
          <div className="profileInfo">
            <ProfileName data={data} />
          </div>

          <div className="profilePost">
            {isLoading ? (
              <Loading />
            ) : error ? (
              <p>Somethings wents wrong...</p>
            ) : data.posts.length < 1 ? (
              <p>You don't have any post. Please create new post now!</p>
            ) : (
              data.posts.map((post) => (
                <Link
                  className="link"
                  to={`/posts/${post.title}/${post._id}`}
                  key={post._id}
                  onClick={scroll}
                >
                  <Post post={post} />
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
