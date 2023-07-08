import PopularResource from "./postsAll/PopularResource";
import Trending from "./postsAll/Trending";


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Trending />
      <PopularResource />
    </div>
  );
};

export default Sidebar;
