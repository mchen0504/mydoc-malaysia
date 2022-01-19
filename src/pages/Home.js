import React, { Component } from "react";
import Header from "../components/home/Header";
import Problem from "../components/home/Problem";
import Solution from "../components/home/Solution";
import ListPractice from "../components/home/ListPractice";
import About from "../components/home/About";
import Team from "../components/home/Team";
import Footer from "../components/home/Footer";
import Navbar from "../components/Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        {/* Change */}
        <Navbar {...this.props} currentPage={"Home"} />
        <Header {...this.props} />
        <Problem />
        <Solution />
        <ListPractice />
        <About />
        <Team />
        <Footer />
      </div>
    );
  }
}

export default Home;
