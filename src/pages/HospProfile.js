import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navbar from "../components/Navbar";
import HospInfo from "../components/profile/HospInfo";
import HospDetailedInfo from "../components/profile/HospDetailedInfo";

const useStyles = makeStyles((theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

function HospProfile(props) {
  const classes = useStyles();
  window.scrollTo(0, 0);
  const backToPage = props.profileBackToDestination;

  const locationParts = useLocation().pathname.split("/");
  const hospital = locationParts[2];
  const specialty = locationParts[3];

  const [hospInfo, setHospInfo] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  useEffect(() => {
    axios
      .get("/hosptwo", {
        params: {
          hospital,
          specialty,
        },
      })
      .then((res) => {
        setHospInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setUserInfo(props.storedCredentials);
  }, [props.storedCredentials]);

  if (!hospInfo) {
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "5%" }}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar currentPage="HosProfile" {...props} />
      <HospInfo
        {...props}
        // backTo={backToPage}
        hospInfo={hospInfo}
        userInfo={userInfo}
      />
      <hr className={classes.line}></hr>
      <HospDetailedInfo {...props} hospInfo={hospInfo} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  storedCredentials: state.user.credentials,
});

export default connect(mapStateToProps)(HospProfile);
