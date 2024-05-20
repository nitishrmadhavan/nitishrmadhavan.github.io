import React, { Component } from "react";
import "./EduStack.scss";
import { Fade, Flip } from "react-reveal";

class EduStack extends Component {
  render() {
    const degree = this.props.degree;
    return (
      <div className="degree-card">
        {degree.logo_path && (
          <Flip left duration={2000}>
            <div className="card-img">
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(0.9)",
                }}
                src={require(`../../Assets/Images/${degree.logo_path}`)}
                alt={degree.alt_name}
              />
            </div>
          </Flip>
        )}
        <Fade right duration={2000} distance="40px">
          <div
            className="card-body"
            style={{ width: degree.logo_path ? "90%" : "100%" }}
          >
            <div
              className="body-header"
            >
              <div className="body-header-title">
                <h2 className="card-title">
                  {degree.title}
                </h2>
                <h3 className="card-subtitle">
                  {degree.subtitle}
                </h3>
              </div>
              <div className="body-header-duration">
                <h3 className="duration">
                  {degree.duration}
                </h3>
              </div>
            </div>
            <div className="body-content">
              {degree.descriptions.map((sentence) => {
                return (
                  <p className="content-list">
                    {sentence}
                  </p>
                );
              })}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default EduStack;
