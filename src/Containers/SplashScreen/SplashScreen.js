import React from "react";
import "./SplashScreen.css";
import DisplayLottie from "../../Components/DisplayLottie/DisplayLottie";
import {GreetingConst, SplashScreenConst} from "../../Utils/Constants";

export default function SplashScreen() {
  return (
    <div className="splash-container">
      <div className="splash-animation-container">
        <DisplayLottie animationData={SplashScreenConst.animation} />
      </div>
      <div className="splash-title-container">
        <span className="grey-color"> &lt;</span>
        <span className="splash-title">{GreetingConst.username}</span>
        <span className="grey-color">/&gt;</span>
      </div>
    </div>
  );
}
