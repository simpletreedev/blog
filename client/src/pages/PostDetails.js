import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import makeRequest from "../services/makeRequest";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import PostAuthor from "../components/posts/PostAuthor";
import Title from "../components/Title";
import CreateComment from "../components/comments/createComment/CreateComment";
import ListComment from "../components/comments/ListComment";
import Trending from "../components/postsAll/Trending";
import BreakingNews from "../components/postsAll/BreakingNews";
import Share from "../components/Share";
import { RiEditBoxLine, RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import BoxConfirm from "../components/BoxConfirm";
import NewPost from "./NewPost";
import PostImg from "../components/posts/PostImg";
import Loading from "../components/Loading";
import EmailBox from "../components/EmailBox";
import Footer from "../components/footers/Footer";
import ShareDetail from "../components/ShareDetail";

const PostDetails = ({ emailBoxRef }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const { currentUser, loading, setLoading } = useContext(AuthContext);
  const postId = useLocation().pathname?.split("/")[3];
  const { isLoading, data, error } = useQuery(["post", postId], () =>
    makeRequest.get(`/posts/${postId}`).then((res) => res.data.post)
  );

  const handleOpenDialog = () => {
    setOpenDialog(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenEditPost = () => {
    setOpenEditPost(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseEditPost = () => {
    setOpenEditPost(false);
    document.body.style.overflow = "auto";
  };

  const mutationPost = useMutation(
    () => {
      setLoading(true);
      return makeRequest.delete(`/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setLoading(false);
      },
    }
  );

  const handleRemovePost = () => {
    mutationPost.mutate();
    navigate("/");
  };

  const mutationBookmark = useMutation(
    (marked) => makeRequest.put(`/posts/${postId}/saved`, marked),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", postId]);
      },
    }
  );

  const handleBookmarkPost = () => {
    mutationBookmark.mutate({ userId: currentUser.userId });
    window.location.reload();
  };

  if (loading) return <Loading />;

  return (
    <div className="postDetails">
      <div className="pdContainer">
        {isLoading ? (
          <Loading />
        ) : error ? (
          <p>Something wents wrong...</p>
        ) : (
          <div className="pdItem">
            <h1>{data.title}</h1>
            <div className="pdSection">
              <div className="pdLeft">
                <div className="pdInfo">
                  <PostAuthor
                    categories={data.categories}
                    name={data.author.name}
                    userId={data.author?._id}
                  />
                  <div className="pdActions">
                    {data.bookmarks?.includes(currentUser.userId) ? (
                      <BsBookmarkFill
                        style={{
                          marginRight: "10px",
                          cursor: "pointer",
                          color: "goldenrod",
                        }}
                        onClick={handleBookmarkPost}
                      />
                    ) : (
                      <BsBookmark
                        style={{ marginRight: "10px", cursor: "pointer" }}
                        onClick={handleBookmarkPost}
                      />
                    )}

                    {data.views > 0 && (
                      <div className="pdView">
                        <AiOutlineEye />
                        <span>{data.views}</span>
                      </div>
                    )}
                    {currentUser.userId === data.author._id && (
                      <>
                        <RiEditBoxLine
                          className="pdIcon"
                          onClick={handleOpenEditPost}
                        />
                        <RiDeleteBinLine
                          className="pdIcon"
                          onClick={handleOpenDialog}
                        />
                      </>
                    )}
                  </div>
                </div>
                <PostImg image={data.image} dateCreated={data.dateCreated} />
                <div
                  className="pdDesc"
                  dangerouslySetInnerHTML={{ __html: data.desc }}
                />
                <div className="pdShare">
                  <ShareDetail />
                </div>
                <Title title="Comments" />
                <CreateComment
                  typeBtn="Submit"
                  parentPost={postId}
                  author={currentUser.userId}
                />
                <ListComment data={data.comments} />
              </div>
              <Trending />
            </div>
          </div>
        )}
        {openDialog && (
          <BoxConfirm
            handleRemovePost={handleRemovePost}
            handleCloseDialog={handleCloseDialog}
          />
        )}
        {openEditPost && (
          <NewPost
            type="edit"
            data={data}
            handleCloseEditPost={handleCloseEditPost}
          />
        )}
        <Share />
      </div>
      <BreakingNews />
      <EmailBox emailBoxRef={emailBoxRef} />
      <Footer />
    </div>
  );
};

export default PostDetails;
