import React from "react";
import "./Education.scss";
import EduStack from "../../Components/EduStack/EduStack";
import { EducationInfoConst } from "../../Utils/Constants";
import { Fade } from "react-reveal";

export default function Education() {
  if (EducationInfoConst.display) {
    return (
      <div className="main" id="Education">
        <Fade bottom duration={2000} distance="20px">
          <div className="education-container" id="educations">
            <div>
              <h1 className="education-heading">A student of</h1>
              <div className="education-body-div">
                {EducationInfoConst.degrees.map((degree, index) => (
                  <EduStack key={index} degree={degree} />
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}

