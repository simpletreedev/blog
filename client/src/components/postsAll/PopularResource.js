import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Title from "../Title";
import makeRequest from "../../services/makeRequest";
import Loading from "../Loading";
import { scroll } from "../../utils/scroll";

const PopularResource = () => {
  const { isLoading, data, error } = useQuery(["trending"], () =>
    makeRequest.get("/posts/trending").then((res) => res.data.posts)
  );

  return (
    <div className="popularResoures">
      <Title title="Popular Resources" />
      <div className="pr-list">
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
              <div className="pr-item">
                <div className="pr-img">
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

export default PopularResource;
