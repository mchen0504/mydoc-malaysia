import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";

//components from docAccount folder
import DocSideNav from "../components/docAccount/DocSideNav";
import Navbar from "../components/Navbar";
import CovidAlert from "../components/Alert";

// import DocEditProfile from "../components/docAccount/DocEditProfile";
import DocAccountVerification from "../components/docAccount/DocAccountVerification";
import AccountSettings from "../components/docAccount/AccountSettings";
import DocEditProfile from "../components/docAccount/DocEditProfile";

//eshin加的 5/4/2020
import LikeHistorySaved from "../components/docAccount/LikeHistorySaved";

// material ui style
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
  const [isLoading, setLoading] = useState(false);
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
          .get("/doctorprofile", {
            params: {
              username: userInfo.username,
              specialty: userInfo.profile.specialty,
              hospital: userInfo.profile.hospital,
            },
          })
          .then((res) => {
            setDocInfo(res.data);
            setLoading(false);
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
        <LikeHistorySaved
          {...props}
          database={props.database}
          saveLike="saved"
          userInfo={userInfo}
        />
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
    rightPanel = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="saved"
        userInfo={userInfo}
      />
    );
    mobileScreen = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="saved"
        userInfo={userInfo}
      />
    );
  } else if (index === 3) {
    rightPanel = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="likeHistory"
        userInfo={userInfo}
      />
    );
    mobileScreen = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="likeHistory"
        userInfo={userInfo}
      />
    );
  } else if (index === 4) {
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
  } else {
    rightPanel = <AccountSettings />;
    mobileScreen = <AccountSettings />;
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
              isLoading={isLoading}
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
