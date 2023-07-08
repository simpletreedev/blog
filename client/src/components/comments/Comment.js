import moment from "moment";
import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { BsArrowReturnRight } from "react-icons/bs";
import { useContext, useState } from "react";
import CreateComment from "./createComment/CreateComment";
import { AuthContext } from "../../context/AuthContext";
import { getReplyComments } from "../../services";
import { scroll } from "../../utils/scroll";

const Comment = ({ comment, data }) => {
  const { currentUser } = useContext(AuthContext);
  const [openReplyCm, setOpenReplyCm] = useState(false);
  const [showReplyCm, setShowReplyCm] = useState(false);

  const handleOpenReplyCm = () => {
    setOpenReplyCm(true);
  };

  const handleCloseReplyCm = () => {
    setOpenReplyCm(false);
  };

  // get comment which has parentId = current comment id
  let replyComments = getReplyComments(data, comment._id);

  return (
    <div className="comment">
      <div className="commentImg">
        <Link
          to={`/users/${comment.author?._id}`}
          className="link"
          onClick={scroll}
        >
          <img src={comment.author?.avatar} alt="" />
        </Link>
      </div>
      <div className="commentInfo">
        <div className="namecontent">
          <div className="name">
            <Link
              to={`/users/${comment.author?._id}`}
              className="link"
              onClick={scroll}
            >
              <b>{comment.author?.name}</b>
            </Link>
            <span>{moment(comment.dateCreated).format("MMM D")}</span>
          </div>

          <p>{comment.content}</p>
        </div>

        <div className="commentDetails">
          <p>
            <AiOutlineHeart className="iconCm" /> <span>0 like</span>
          </p>
          {!openReplyCm ? (
            <p onClick={handleOpenReplyCm}>
              <VscComment className="iconCm" /> <span>reply</span>
            </p>
          ) : (
            <p onClick={handleCloseReplyCm}>
              <VscComment className="iconCm" />
              <span>close</span>
            </p>
          )}
          {replyComments?.length > 0 && (
            <p onClick={() => setShowReplyCm(!showReplyCm)}>
              <BsArrowReturnRight className="iconScroll" />
              <span>{replyComments?.length} replies</span>
            </p>
          )}
        </div>
        {openReplyCm && (
          <CreateComment
            typeBtn="Reply"
            parentPost={comment.parentPost}
            author={currentUser.userId}
            parentId={comment._id}
            setOpenReplyCm={setOpenReplyCm}
            setShowReplyCm={setShowReplyCm}
          />
        )}
        {replyComments?.length > 0 &&
          replyComments.map((c) => {
            if (showReplyCm) {
              return <Comment comment={c} key={c._id} data={data} />;
            }
          })}
      </div>
    </div>
  );
};

export default Comment;
