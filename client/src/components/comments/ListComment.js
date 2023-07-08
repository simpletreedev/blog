import Comment from "./Comment";
import { getRootComments } from "../../services";

const ListComment = ({ data }) => {
  // get comment which has parentId = null
  let rootComments = getRootComments(data);

  return (
    <div className="listComments">
      {rootComments?.length > 0 &&
        rootComments.map((c) => (
          <Comment key={c._id} comment={c} data={data} />
        ))}
    </div>
  );
};

export default ListComment;
