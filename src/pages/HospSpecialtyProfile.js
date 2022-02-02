import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../components/Navbar";
import HospInfo from "../components/profile/HospInfo";
import HospSpecialtyDetailedInfo from "../components/profile/HospSpecialtyDetailedInfo";

const useStyles = makeStyles((theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

function HospSpecialtyProfile() {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <HospInfo />
      <hr className={classes.line}></hr>
      <HospSpecialtyDetailedInfo />
    </div>
  );
}

export default HospSpecialtyProfile;
