import React from "react";
import "./GoToTop.css";

export default function GoToTop() {
  function GoUpEvent() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function scrollFunction() {
    if (
      document.body.scrollTop > 30 ||
      document.documentElement.scrollTop > 30
    ) {
      document.getElementById("topButton").style.visibility = "visible";
    } else {
      document.getElementById("topButton").style.visibility = "hidden";
    }
  }

  window.onscroll = function () {
    scrollFunction();
  };

  return (
    <div
      onClick={GoUpEvent}
      id="topButton"
      className="top-button"
      title="Go up"
    >
      <i className="fas fa-arrow-up arrow" aria-hidden="true" />
    </div>
  );
}
