import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navbar from "../components/Navbar";
import Appointment from "../components/profile/Appointment";
import DocDetailedInfo from "../components/profile/DocDetailedInfo";
import DocInfo from "../components/profile/DocInfo";

const useStyles = makeStyles((theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

function DocProfile(props) {
  const classes = useStyles();
  window.scrollTo(0, 0);
  // const backToPage = props.profileBackToDestination;

  const locationParts = useLocation().pathname.split("/");
  const hospital = locationParts[2];
  const specialty = locationParts[3];
  const name = locationParts[4];

  const [docInfo, setDocInfo] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios
      .get("/api/doctorprofile", {
        params: {
          hospital,
          specialty,
          name,
        },
      })
      .then((res) => {
        setDocInfo(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setUserInfo(props.storedCredentials);
  }, [props.storedCredentials]);

  if (!docInfo) {
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "50%", marginTop: "5%" }}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar currentPage="DocProfile" {...props} />
      <DocInfo
        {...props}
        // backTo={backToPage}
        docInfo={docInfo}
        setDocInfo={setDocInfo}
        userInfo={userInfo}
      />
      <hr className={classes.line}></hr>
      <Appointment {...props} docInfo={docInfo} />
      <hr className={classes.line}></hr>
      <DocDetailedInfo {...props} docInfo={docInfo} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  storedCredentials: state.user.credentials,
});

export default connect(mapStateToProps)(DocProfile);
