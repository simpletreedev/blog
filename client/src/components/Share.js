import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa";

const Share = () => {
  return (
    <ul className="share">
      <p>SHARE</p>
      <li className="shareItem" style={{ background: "#1da1f2" }}>
        <AiOutlineTwitter className="icon" />
      </li>
      <li className="shareItem" style={{ background: "#4267b2" }}>
        <ImFacebook className="icon" />
      </li>
      <li className="shareItem" style={{ background: "#007bb6" }}>
        <FaLinkedinIn className="icon" />
      </li>
      <li
        className="shareItem"
        style={{
          background:
            "linear-gradient(45deg,#f09433 0,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
        }}
      >
        <AiOutlineInstagram className="icon" />
      </li>
    </ul>
  );
};

export default Share;
