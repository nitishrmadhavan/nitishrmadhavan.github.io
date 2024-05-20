import React from "react";
import "./Experience.scss";
import ExpStack from "../../Components/ExpStack/ExpStack";
import { ExperiencesConst } from "../../Utils/Constants";
import { Fade } from "react-reveal";

export default function Experience() {
  if (ExperiencesConst.display) {
    return (
      <div id="Experience">
        <Fade bottom duration={1000} distance="20px">
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">An Intern of</h1>
              <div className="experience-cards-div">
                {ExperiencesConst.experience.map((card, i) => {
                  return (
                    <ExpStack
                      key={i}
                      cardInfo={{
                        company: card.company,
                        desc: card.desc,
                        date: card.date,
                        companylogo: card.companylogo,
                        role: card.role,
                        descBullets: card.descBullets
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}