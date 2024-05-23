import React, { Component } from "react";
import "./SplashScreen.css";
import { Redirect } from "react-router-dom";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" >
        <LoadingScreen id="logo" />
      </div>
    </div>
  );
}

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    this.id = setTimeout(() => this.setState({ redirect: true }), 5500);
  }

  componentWillMount() {
    clearTimeout(this.id);
  }

  render() {
    return  (
      <AnimatedSplash/>
    );
  }
}

export default Splash;
