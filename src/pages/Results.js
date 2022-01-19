import React, { Component } from "react";
import SearchResults from "../components/results/SearchResults";
import Navbar from "../components/Navbar";

class Results extends Component {
  render() {
    return (
      <div>
        <Navbar currentPage="results" {...this.props} />
        <SearchResults {...this.props} />
      </div>
    );
  }
}

export default Results;
