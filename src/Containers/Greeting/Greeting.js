import React from "react";
import { Fade } from "react-reveal";
import "./Greeting.scss";
import Button from "../../Components/Button/Button";
import { GreetingConst } from "../../Utils/Constants";

export default function Greeting() {
  if (!GreetingConst.displayGreeting) {
    return null;
  }
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1 className="greeting-text">{GreetingConst.title}</h1>
              <p className="greeting-text-p subTitle">{GreetingConst.subTitle}</p>
              <div className="button-greeting-div">
                <Button text="Contact me" href="#contact" />
                {GreetingConst.resumeLink && (
                  <Button text="Resume" newTab={true} href={GreetingConst.resumeLink} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}
