import React, { Component } from "react";
import SearchResults from "../Components/results/SearchResults";
import Navbar from "../Components/Navbar";

class Results extends Component {

  render() {
    return (
      <div>
        <Navbar currentPage='results' {...this.props}/>
        <SearchResults {...this.props}/>
      </div>
    );
  }
}

export default Results;
