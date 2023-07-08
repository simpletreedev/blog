import moment from "moment";

const PostImg = ({ image, dateCreated }) => {
  return (
    <div className="postLeft">
      <img src={image} alt="" />
      <div className="postDate">
        <p>{moment(dateCreated).format("MMM D")}</p>
        <p>{moment(dateCreated).format("YYYY")}</p>
      </div>
    </div>
  );
};

export default PostImg;
