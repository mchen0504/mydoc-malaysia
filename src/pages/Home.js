import React from "react";
import Header from "../components/home/Header";
import Problem from "../components/home/Problem";
import Solution from "../components/home/Solution";
import ListPractice from "../components/home/ListPractice";
import About from "../components/home/About";
import Team from "../components/home/Team";
import Footer from "../components/home/Footer";
import Navbar from "../components/Navbar";

function Home(props) {
  return (
    <div>
      <Navbar {...props} currentPage={"Home"} />
      <Header {...props} />
      <Problem />
      <Solution />
      <ListPractice />
      <About />
      <Team />
      <Footer />
    </div>
  );
}

export default Home;
