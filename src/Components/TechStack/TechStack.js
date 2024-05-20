import React from "react";
import "./TechStack.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class TeckStack extends React.Component {
  render() {
    const { logos } = this.props;

    return (
      <div>
        <div className="software-skills-main-div">
          <ul className="dev-icons">
            {logos && logos.map((logo) => (
              <OverlayTrigger
                key={logo.skillName}
                placement={"top"}
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    <strong>{logo.skillName}</strong>
                  </Tooltip>
                }
              >
                <li className="software-skill-inline" name={logo.skillName}>
                  {logo.fontAwesomeClassname && (
                    <span
                      className="iconify"
                      data-icon={logo.fontAwesomeClassname}
                      style={logo.style}
                      data-inline="false"
                    ></span>
                  )}
                </li>
              </OverlayTrigger>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TeckStack;
