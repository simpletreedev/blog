import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import makeRequest from "../../../services/makeRequest";

const CreateComment = ({
  parentPost,
  author,
  typeBtn,
  parentId = null,
  setOpenReplyCm,
  setShowReplyCm,
}) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const mutaion = useMutation(
    async (newCm) => await makeRequest.post("/comments", newCm),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", parentPost]);
      },
    }
  );

  const handleComment = (e) => {
    e.preventDefault();

    mutaion.mutate({ content, parentPost, author, parentId });
    setContent("");
    if (typeBtn === "Reply") {
      setOpenReplyCm(false);
      setShowReplyCm(true);
    }
  };

  return (
    <form>
      <textarea
        name="comment"
        id="comment"
        cols="30"
        rows="10"
        placeholder="What are your thought?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="button" onClick={handleComment} disabled={!content.length}>
        {typeBtn}
      </button>
    </form>
  );
};

export default CreateComment;
