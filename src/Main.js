import React from "react";
import NavBar from "./Containers/NavBar/NavBar";
import Greeting from "./Containers/Greeting/Greeting";
import Skills from "./Containers/Skills/Skills";
import Experience from "./Containers/Experience/Experience";
import Education from "./Containers/Education/Education";
import Projects from "./Containers/Projects/Projects";
import GoToTop from "./Components/GoToTop/GoToTop";
import SocialLinks from "./Containers/Social Media/SocialLinks";

const Main = () => {
  return (
    <div>
      <NavBar />
      <Greeting />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <SocialLinks />
      <GoToTop />
    </div>
  );
};

export default Main;
