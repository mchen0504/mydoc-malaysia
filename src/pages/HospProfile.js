import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Navbar from "../components/Navbar";
import HospInfo from "../components/profile/HospInfo";
import HospDetailedInfo from "../components/profile/HospDetailedInfo";
import HospDetailedInfoTest from "../components/profile/HospDetailedInfoTest";
import HospInfoTest from "../components/profile/HospInfoTest";

const useStyles = makeStyles((theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

export default function HospProfile(props) {
  const classes = useStyles();
  window.scrollTo(0, 0);
  const backToPage = props.profileBackToDestination;

  const locationParts = useLocation().pathname.split("/");
  const hospital = locationParts[2];
  const specialty = locationParts[3];

  const [hospInfo, setHospInfo] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/hosptwo", {
          params: {
            hospital,
            specialty,
          },
        });
        setHospInfo(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, []);

  useEffect(() => {
    const getUserInfo = () => {
      props.storedCredentials.then((res) => {
        setUserInfo(res);
      });
    };
    if (hospInfo) {
      getUserInfo();
    }
  }, []);

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
      {/* <HospInfo {...props} backTo={backToPage} /> */}
      <HospInfoTest
        {...props}
        backTo={backToPage}
        hospInfo={hospInfo}
        userInfo={userInfo}
      />
      <hr className={classes.line}></hr>
      {/* <HospDetailedInfo {...props} /> */}
      <HospDetailedInfoTest {...props} hospInfo={hospInfo} />
    </div>
  );
}
