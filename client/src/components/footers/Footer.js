import {
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiOutlineYoutube,
} from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { FaLinkedinIn, FaTelegramPlane } from "react-icons/fa";
import { BiRss } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { data1 } from "./footerData";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerContainer">
        <h2>Connect with us!</h2>
        <ul className="footerLinks">
          <li className="footerLinksItem">
            <div className="footer-icon" style={{ background: "#1da1f2" }}>
              <AiOutlineTwitter className="icon" />
            </div>
            <span>894,000 Followers</span>
          </li>
          <li className="footerLinksItem">
            <div className="footer-icon" style={{ background: "#4267b2" }}>
              <ImFacebook className="icon" />
            </div>
            <span>1,950,000 Followers</span>
          </li>
          <li className="footerLinksItem">
            <div className="footer-icon" style={{ background: "#007bb6" }}>
              <FaLinkedinIn className="icon" />
            </div>
            <span>452,000 Followers</span>
          </li>
          <li className="footerLinksItem">
            <div className="footer-icon" style={{ background: "#ce332d" }}>
              <AiOutlineYoutube className="icon" />
            </div>
            <span>20,900 Followers</span>
          </li>
          <li className="footerLinksItem">
            <div
              className="footer-icon"
              style={{
                background:
                  "linear-gradient(45deg,#f09433 0,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
              }}
            >
              <AiOutlineInstagram className="icon" />
            </div>
            <span>144,000 Followers</span>
          </li>
          <li className="footerLinksItem">
            <div className="footer-icon" style={{ background: "#ce332d" }}>
              <FaTelegramPlane className="icon" />
            </div>
            <span>110,000 Followers</span>
          </li>
        </ul>

        <div className="footer-center">
          <ul className="footer-center-left">
            {data1.map((item, index) => (
              <div className="footer-item" key={index}>
                <h3>{item.title}</h3>
                {item.arr.map((a, i) => (
                  <p key={i}>{a}</p>
                ))}
              </div>
            ))}
          </ul>
          <div className="footer-center-right">
            <div className="footer-button">
              <BiRss />
              <span>RSS Feed</span>
            </div>
            <div className="footer-button">
              <MdEmail />
              <span>Contact Us</span>
            </div>
          </div>
        </div>

        <p className="subFooter">
          © The Hacker News, 2023. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
