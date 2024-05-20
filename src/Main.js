import React, {useEffect, useState} from "react";
import NavBar from "./Containers/NavBar/NavBar"
import Greeting from "./Containers/Greeting/Greeting";
import Skills from "./Containers/Skills/Skills";
import Experience from "./Containers/Experience/Experience";
import Education from "./Containers/Education/Education";
import SplashScreen from "./Containers/SplashScreen/SplashScreen";
import Projects from "./Containers/Projects/Projects";
import {SplashScreenConst} from "./Utils/Constants";
import {StyleProvider} from "./Utils/StyleContext";
import {UseLocalStorage} from "./Utils/UseLocalStorage";
import GoToTop from "./Components/GoToTop/GoToTop";

const Main = () => {
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = UseLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);

  useEffect(() => {
    if (SplashScreenConst.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        SplashScreenConst.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && SplashScreenConst.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <NavBar />
            <Greeting />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <GoToTop />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main