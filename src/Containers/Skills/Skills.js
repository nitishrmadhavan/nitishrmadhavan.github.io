import React from "react";
import "./Skills.scss";
import TeckStack from "../../Components/TechStack/TechStack";
import { SkillsSectionConst } from "../../Utils/Constants";
import { Fade } from "react-reveal";

export default function Skills() {
  if (SkillsSectionConst.display) {
    const skillsData = SkillsSectionConst?.data || [];
    return (
      <><div className="main" id="skills">
        <div className="skills-header-div">
          <Fade bottom duration={2000} distance="20px">
            <h1 className="skills-header">
              What I do?
            </h1>
          </Fade>
        </div>
        <TeckStack />
      </div><div>
          {skillsData.map((skill, i) => {
            return (
              <div key={i} className="skills-main-div">
                <div className="skills-text-div">
                  <Fade right duration={1000}>
                    <h1 className="skills-heading">
                      {skill.title}
                    </h1>
                  </Fade>
                  <Fade right duration={1500}>
                    <TeckStack logos={skill.softwareSkills} />
                  </Fade>
                  <Fade right duration={2000}>
                    <div>
                      {skill.skills?.map((skillSentence, i) => {
                        return (
                          <p
                            key={i}
                            className="subTitle skills-text"
                          >
                            {skillSentence}
                          </p>
                        );
                      })}
                    </div>
                  </Fade>
                </div>
              </div>
            );
          })}
        </div></>
    );
  }
  return null;
}
