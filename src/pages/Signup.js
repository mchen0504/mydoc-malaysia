import React, { Component } from "react";
import Bg from "../img/login/doctors-heart.png";

// material ui
import withStyles from "@material-ui/core/styles/withStyles";

// Components
import SignupTab from "../Components/login/SignupTab";
import Navbar from "../Components/Navbar";
import CovidAlert from "../Components/Alert";

// material ui style
const styles = (theme) => ({
  ...theme.auth,
  bg: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    width: "300px",
    height: "300px",
    position: "fixed",
    margin: 0,
    padding: 0,
    right: -120,
    bottom: 0,
  },
  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },
});

// Sign up page
class Signup extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar currentPage='signUp'/>
        <div className={classes.covidBox}>
          <CovidAlert />

          <SignupTab />
          <img src={Bg} alt="doctor-hearts" className={classes.bg} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Signup);
