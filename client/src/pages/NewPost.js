import { useContext, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import makeRequest from "../services/makeRequest";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import TextEditor from "../components/TextEditor";

const NewPost = ({ type, handleCloseEditPost, data }) => {
  const { currentUser, setLoading, loading } = useContext(AuthContext);
  const [image, setImage] = useState(null || data?.image);
  const [title, setTitle] = useState("" || data?.title);
  const [desc, setDesc] = useState("" || data?.desc);
  const [categories, setCategories] = useState(
    "Data Breaches" || data?.categories
  );

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(
    (post) => {
      if (type === "edit") {
        setLoading(true);
        return makeRequest.patch(`/posts/${data._id}`, post);
      }
      setLoading(true);
      return makeRequest.post("/posts", post);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
        setLoading(false);
      },
    }
  );

  const handlePost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("categories", categories);
    if (type !== "edit") {
      formData.append("author", currentUser.userId);
    }

    mutation.mutate(formData);
    if (type === "edit") {
      handleCloseEditPost();
    }

    navigate("/");
    window.scrollTo(0, 0);
  };

  if (loading) return <Loading />;

  return (
    <div className="newPost">
      <form className="newPostForm">
        <p className="newPostImg">
          <label htmlFor="inputTag">
            Select Image
            <input
              id="inputTag"
              type="file"
              placeholder="Choose a image ..."
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          {image && (
            <img
              src={
                type === "edit" ? image : image && URL.createObjectURL(image)
              }
              alt=""
            />
          )}
        </p>
        <input
          type="text"
          placeholder="New post title here..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="postSelect">
          <p>Choose categories: </p>
          <select
            name="categories"
            id="categories"
            value={type == "edit" ? data?.categories : categories}
            onChange={(e) => setCategories(e.target.value)}
          >
            <option value="Data Breaches">Data Breaches</option>
            <option value="Cyber Attacks">Cyber Attacks</option>
            <option value="Vulnerablilities">Vulnerablilities</option>
            <option value="Webinars">Webinars</option>
          </select>
        </div>
        <TextEditor value={desc} onChange={setDesc} />
        <div className="newPostBtns">
          {type === "edit" && (
            <button onClick={handleCloseEditPost}>Cancel</button>
          )}
          <button
            onClick={handlePost}
            style={{ color: "white", background: "#3732b3", float: "right" }}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
