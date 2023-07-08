import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Title from "../Title";
import makeRequest from "../../services/makeRequest";
import Loading from "../Loading";
import { scroll } from "../../utils/scroll";

const Trending = () => {
  const { isLoading, data, error } = useQuery(["trending"], () =>
    makeRequest.get("/posts/trending").then((res) => res.data.posts)
  );

  return (
    <div className="trending">
      <Title title="Trending News" />
      <div className="trendingList">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Somethings went wrong...</p>
        ) : (
          data.map((trend) => (
            <Link
              key={trend._id}
              className="link"
              to={`/posts/${trend.title}/${trend._id}`}
              onClick={scroll}
            >
              <div className="trendingItem">
                <div className="trendingImg">
                  <img src={trend.image} alt="" />
                </div>
                <p>{trend.title}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Trending;
