// SocialMedia.js
import React from "react";
import "./SocialLinks.scss";
import SocialStack from "../../Components/SocialStack/SocialStack";
import { SocialMediaLinksConst } from "../../Utils/Constants";
import { Fade } from "react-reveal";

export default function SocialLinks() {
  if (SocialMediaLinksConst.display) {
    return (
      <div id="SocialMedia">
        <Fade bottom duration={1000} distance="20px">
          <div className="social-media-container">
            <h1 className="social-media-heading">Social Media</h1>
            <div className="profile-cards-div">
              {SocialMediaLinksConst.socials.map((profile, i) => (
                <SocialStack key={i} profile={profile} />
              ))}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}
