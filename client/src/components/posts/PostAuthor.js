import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TbCategory } from "react-icons/tb";

const PostAuthor = ({ categories, name, userId }) => {
  return (
    <div className="postAuthor">
      <Link className="link" to={`/users/${userId}`}>
        <p>
          <BsPersonFill /> <span>{name}</span>
        </p>
      </Link>
      <p>
        <TbCategory />
        <span>{categories}</span>
      </p>
    </div>
  );
};

export default PostAuthor;
