import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../services/makeRequest";
import Title from "../Title";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { scroll } from "../../utils/scroll";

const BreakingNews = () => {
  const { isLoading, data, error } = useQuery(["breaking"], () =>
    makeRequest.get("/posts/breaking").then((res) => res.data.posts)
  );

  return (
    <div className="breaking">
      <div className="breakingContainer">
        <Title title="Breaking News" />
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Somethings wents wrong...</p>
        ) : (
          <ul className="breakingList">
            {data.map((post) => (
              <Link
                className="link"
                to={`/posts/${post.title}/${post._id}`}
                key={post._id}
                onClick={scroll}
              >
                <li className="breakingItem">
                  <div className="breakingImg">
                    <img src={post.image} alt="" />
                  </div>
                  <p className="breakingTitle">{post.title}</p>
                  <p className="breakingDesc">{post.desc}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BreakingNews;
