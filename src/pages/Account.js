import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

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

import { connect } from "react-redux";

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

  const [userInfo, setUserInfo] = React.useState();
  const [profileShowWarning, setWarningProfile] = React.useState("");
  const [verifyShowWarning, setWarningVerify] = React.useState("");

  useEffect(() => {
    const getUserInfo = () => {
      props.storedCredentials.then((res) => {
        setUserInfo(res);
      });
    };
    getUserInfo();
  }, []);

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
      userInfo.userType === "doctor" ? (
        <DocEditProfile setProfileWarning={setProfileWarning} />
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
        profileShowWarning={profileShowWarning}
        setProfileWarning={setProfileWarning}
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
      />
    );
  } else if (index === 1) {
    rightPanel = <DocEditProfile setProfileWarning={setProfileWarning} />;
    mobileScreen = <DocEditProfile setProfileWarning={setProfileWarning} />;
  } else if (index === 2) {
    rightPanel = (
      <LikeHistorySaved {...props} database={props.database} saveLike="saved" />
    );
    mobileScreen = (
      <LikeHistorySaved {...props} database={props.database} saveLike="saved" />
    );
  } else if (index === 3) {
    rightPanel = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="likeHistory"
      />
    );
    mobileScreen = (
      <LikeHistorySaved
        {...props}
        database={props.database}
        saveLike="likeHistory"
      />
    );
  } else if (index === 4) {
    rightPanel = (
      <DocAccountVerification
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
      />
    );
    mobileScreen = (
      <DocAccountVerification
        verifyShowWarning={verifyShowWarning}
        setVerifyWarning={setVerifyWarning}
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
