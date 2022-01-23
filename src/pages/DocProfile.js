import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

//components
import Navbar from "../components/Navbar";
import Appointment from "../components/profile/Appointment";
import DocDetailedInfo from "../components/profile/DocDetailedInfo";
import DocInfo from "../components/profile/DocDetailedInfoTest";
import Test from "../components/profile/Test";
import AppointmentTest from "../components/profile/AppointmentTest";

const useStyles = makeStyles((theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
}));

export default function DocProfile(props) {
  const classes = useStyles();
  window.scrollTo(0, 0);
  const backToPage = props.profileBackToDestination;

  const locationParts = useLocation().pathname.split("/");
  const hospital = locationParts[2];
  const specialty = locationParts[3];
  const name = locationParts[4];

  const [docInfo, setDocInfo] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const res = await axios.get("/two", {
          params: {
            hospital,
            specialty,
            name,
          },
        });
        setDocInfo(res.data);
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
    if (docInfo) {
      getUserInfo();
    }
  }, []);

  if (!docInfo) {
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
      <Navbar currentPage="DocProfile" {...props} />
      {/* <DocInfo {...this.props} backTo={backToPage} /> */}
      <Test
        {...props}
        backTo={backToPage}
        docInfo={docInfo}
        userInfo={userInfo}
      />
      <hr className={classes.line}></hr>
      {/* <Appointment {...this.props} /> */}
      <AppointmentTest {...props} docInfo={docInfo} />
      <hr className={classes.line}></hr>
      {/* <DocDetailedInfo {...this.props} /> */}
      <DocInfo {...props} docInfo={docInfo} />
    </div>
  );
}
