import React, { Component } from "react";
import Header from "../Components/home/Header";
import Problem from "../Components/home/Problem";
import Solution from "../Components/home/Solution";
import ListPractice from "../Components/home/ListPractice";
import About from "../Components/home/About";
import Team from "../Components/home/Team";
import Footer from "../Components/home/Footer";
import Navbar from "../Components/Navbar";

class Home extends Component {
  render() {
    return (
      <div>
        {/* Change */}
        <Navbar currentPage={'Home'}/>
        <Header {...this.props}/>
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
