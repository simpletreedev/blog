import { AiOutlineTwitter, AiOutlineShareAlt } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";

const ShareDetail = () => {
  return (
    <div className="shareDetail">
      {/* <div
        class="fb-share-button"
        data-href="https://developers.facebook.com/docs/plugins/"
        data-layout=""
        data-size=""
      >
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse"
          class="fb-xfbml-parse-ignore"
        >
          Share
        </a>
      </div> */}
      <div className="shareDetail-item">
        <div className="shareDetail-left" style={{ background: "#1a91d9" }}>
          <AiOutlineTwitter className="icon" />
        </div>
        <div className="shareDetail-right" style={{ background: "#1da1f2" }}>
          <span>Tweet</span>
        </div>
      </div>
      <div className="shareDetail-item">
        <div className="shareDetail-left" style={{ background: "#006ea3" }}>
          <FaLinkedinIn className="icon" />
        </div>
        <div className="shareDetail-right" style={{ background: "#007bb6" }}>
          <span>Share</span>
        </div>
      </div>
      <div className="shareDetail-item">
        <div className="shareDetail-left" style={{ background: "#3949a3" }}>
          <ImFacebook className="icon" />
        </div>
        <div className="shareDetail-right" style={{ background: "#3f51b5" }}>
          <span>Share</span>
        </div>
      </div>
      <div className="shareDetail-item">
        <div
          className="shareDetail-left"
          style={{
            background: "#cb4c3d",
          }}
        >
          <AiOutlineShareAlt className="icon" />
        </div>
        <div className="shareDetail-right" style={{ background: "#e25544" }}>
          <span>Share</span>
        </div>
      </div>
    </div>
  );
};

export default ShareDetail;
