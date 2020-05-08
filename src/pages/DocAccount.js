import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

//components from docAccount folder
import DocSideNav from "../Components/docAccount/DocSideNav";
import Navbar from "../Components/Navbar";
import CovidAlert from "../Components/Alert";

// import DocEditProfile from "../Components/docAccount/DocEditProfile";
import DocAccountVerification from "../Components/docAccount/DocAccountVerification";
import AccountSettings from "../Components/docAccount/AccountSettings";
import DocEditProfile from "../Components/docAccount/DocEditProfile";

//eshin加的 5/4/2020
import LikeHistory from "../Components/docAccount/LikeHistory";
import Saved from "../Components/docAccount/Saved";

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

function DocAccount(props) {
  const classes = useStyles();

  // right panel on large screen
  let rightPanel;
  // what will be render on mobile screen
  let mobileScreen;

  const index = props.index;
  if (index == 0) {
    rightPanel = <DocEditProfile />;
    mobileScreen = <DocSideNav />;
  } else if (index == 1) {
    rightPanel = <DocEditProfile />;
    mobileScreen = <DocEditProfile />;
  } else if (index == 2) {
    // the two below are the same
    rightPanel = <Saved />;
    mobileScreen = <Saved />;
  } else if (index == 3) {
    // the two below are the same
    rightPanel = <LikeHistory />;
    mobileScreen = <LikeHistory />;
  } else if (index == 4) {
    rightPanel = <DocAccountVerification />;
    mobileScreen = <DocAccountVerification />;
  } else {
    rightPanel = <AccountSettings />;
    mobileScreen = <AccountSettings />;
  }

  return (
    <div>
      <Navbar />
      <Hidden smDown>
        <div className={classes.covidBox} style={{ position: "relative" }}>
          <CovidAlert />

          <Grid container spacing={0}>
            <Grid item md={4} lg={3}>
              <DocSideNav />
            </Grid>
            <Grid item sm={12} md={8} lg={9}>
              {/* default large screen shows profile even if profile is not selected */}
              {rightPanel}
            </Grid>
          </Grid>
        </div>
      </Hidden>
      <Hidden mdUp>{mobileScreen}</Hidden>
    </div>
  );
}

export default DocAccount;
