import {
  TiSocialTwitter,
  TiSocialLinkedin,
  TiSocialFacebook,
} from "react-icons/ti";

const Sub = () => {
  return (
    <div className="sub">
      <div className="sub-container">
        <p>#1 Trust Cybersecurity News Platform</p>
        <div className="sub-socials">
          <p>Followed by 3.45+ million</p>
          <TiSocialTwitter className="sub-icon"/>
          <TiSocialLinkedin className="sub-icon"/>
          <TiSocialFacebook className="sub-icon"/>
        </div>
      </div>
    </div>
  );
};

export default Sub;
