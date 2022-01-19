import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Navbar from "../components/Navbar";
import HospInfo from "../components/profile/HospInfo";
import HospSpecialtyDetailedInfo from "../components/profile/HospSpecialtyDetailedInfo";

const styles = (theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
});

class HospSpecialtyProfile extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar />
        <HospInfo />
        <hr className={classes.line}></hr>
        <HospSpecialtyDetailedInfo />
      </div>
    );
  }
}

export default withStyles(styles)(HospSpecialtyProfile);
