import PostAuthor from "./PostAuthor";
import PostImg from "./PostImg";

const Post = ({ post }) => {
  const { image, title, categories, dateCreated, desc, author } = post;
  return (
    <div className="post">
      <div className="postContainer">
        <PostImg image={image} dateCreated={dateCreated} />

        <div className="postRight">
          <h1>{title}</h1>
          <PostAuthor
            categories={categories}
            name={author.name}
            userId={author._id}
          />
          <div className="postDesc" dangerouslySetInnerHTML={{ __html: desc }} />
        </div>
      </div>
    </div>
  );
};

export default Post;
