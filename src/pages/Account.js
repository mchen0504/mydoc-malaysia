import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import DocSideNav from "../components/docAccount/DocSideNav";
import Navbar from "../components/Navbar";
import CovidAlert from "../components/Alert";
import DocAccountVerification from "../components/docAccount/DocAccountVerification";
import DocEditProfile from "../components/docAccount/DocEditProfile";
import LikeHistorySaved from "../components/docAccount/LikeHistorySaved";

const useStyles = makeStyles((theme) => ({
  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },
}));

function Account(props) {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState();
  const [docInfo, setDocInfo] = useState();
  const [profileShowWarning, setWarningProfile] = useState("");
  const [verifyShowWarning, setWarningVerify] = useState("");

  useEffect(() => {
    setUserInfo(props.storedCredentials);
  }, [props.storedCredentials]);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userType === "doctor" && userInfo.profile.specialty) {
        axios
          .get("/api/doctorprofile", {
            params: {
              username: userInfo.username,
              specialty: userInfo.profile.specialty,
              hospital: userInfo.profile.hospital.replace(/\s+/g, ""),
            },
          })
          .then((res) => {
            setDocInfo(res.data);
          })
          .catch((err) => console.error(err));
      }
    }
  }, [userInfo]);

  const setProfileWarning = (value) => {
    setWarningProfile(value);
  };

  const setVerifyWarning = (value) => {
    setWarningVerify(value);
  };

  let rightPanel;
  let mobileScreen;

  const index = props.index;
  if (index === 0) {
    rightPanel =
      userInfo?.userType === "doctor" ? (
        <DocEditProfile
          setProfileWarning={setProfileWarning}
          userInfo={userInfo}
          docInfo={docInfo}
        />
      ) : (
        <LikeHistorySaved {...props} saveLike="saved" userInfo={userInfo} />
      );

    mobileScreen = (
      <DocSideNav
        userInfo={userInfo}
        docInfo={docInfo}
        profileShowWarning={profileShowWarning}
        setProfileWarning={setProfileWarning}
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
      />
    );
  } else if (index === 1) {
    rightPanel = (
      <DocEditProfile
        setProfileWarning={setProfileWarning}
        userInfo={userInfo}
        docInfo={docInfo}
      />
    );
    mobileScreen = (
      <DocEditProfile
        setProfileWarning={setProfileWarning}
        userInfo={userInfo}
        docInfo={docInfo}
      />
    );
  } else if (index === 2) {
    rightPanel = <LikeHistorySaved saveLike="saved" userInfo={userInfo} />;
    mobileScreen = <LikeHistorySaved saveLike="saved" userInfo={userInfo} />;
  } else if (index === 3) {
    rightPanel = (
      <LikeHistorySaved saveLike="likeHistory" userInfo={userInfo} />
    );
    mobileScreen = (
      <LikeHistorySaved saveLike="likeHistory" userInfo={userInfo} />
    );
  } else {
    rightPanel = (
      <DocAccountVerification
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
        userInfo={userInfo}
      />
    );
    mobileScreen = (
      <DocAccountVerification
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
        userInfo={userInfo}
      />
    );
  }

  return (
    <div>
      <Navbar currentPage="account" />
      <Hidden smDown>
        <div className={classes.covidBox} style={{ position: "relative" }}>
          <CovidAlert />
        </div>
        <Grid container spacing={0}>
          <Grid item md={4} lg={3}>
            <DocSideNav
              userInfo={userInfo}
              docInfo={docInfo}
              profileShowWarning={profileShowWarning}
              setProfileWarning={setProfileWarning}
              verifyShowWarning={verifyShowWarning}
              setVerifyWarning={setVerifyWarning}
            />
            ;
          </Grid>
          <Grid item sm={12} md={8} lg={9}>
            {/* default large screen shows profile even if profile is not selected */}
            {rightPanel}
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>{mobileScreen}</Hidden>
    </div>
  );
}

const mapStateToProps = (state) => ({
  storedCredentials: state.user.credentials,
});

export default connect(mapStateToProps)(Account);
