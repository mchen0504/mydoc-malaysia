import React from "react";
import Bg from "../img/login/doctors-heart.png";

import { makeStyles } from "@material-ui/core/styles";

import SignupTab from "../components/login/SignupTab";
import Navbar from "../components/Navbar";
import CovidAlert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
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
}));

function Signup() {
  const classes = useStyles();

  return (
    <div>
      <Navbar currentPage="signUp" />
      <div className={classes.covidBox}>
        <CovidAlert />

        <SignupTab />
        <img src={Bg} alt="doctor-hearts" className={classes.bg} />
      </div>
    </div>
  );
}

export default Signup;
