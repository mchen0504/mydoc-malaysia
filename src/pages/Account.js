import React from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from '@material-ui/core/CircularProgress';

//components from docAccount folder
import DocSideNav from "../Components/docAccount/DocSideNav";
import Navbar from "../Components/Navbar";
import CovidAlert from "../Components/Alert";

// import DocEditProfile from "../Components/docAccount/DocEditProfile";
import DocAccountVerification from "../Components/docAccount/DocAccountVerification";
import AccountSettings from "../Components/docAccount/AccountSettings";
import DocEditProfile from "../Components/docAccount/DocEditProfile";

//eshin加的 5/4/2020
import LikeHistorySaved from "../Components/docAccount/LikeHistorySaved";

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


  // right panel on large screen
  let rightPanel;
  // what will be render on mobile screen
  let mobileScreen;

  const index = props.index;
  if (index == 0) {
    rightPanel = props.storedCredentials.userType == "doctor" ? <DocEditProfile /> : <LikeHistorySaved {...props} database={props.database} saveLike="saved" />;
    mobileScreen = <DocSideNav />;
  } else if (index == 1) {
    rightPanel = <DocEditProfile />;
    mobileScreen = <DocEditProfile />;
  } else if (index == 2) {
    rightPanel = <LikeHistorySaved {...props} database={props.database} saveLike="saved" />;
    mobileScreen = <LikeHistorySaved{...props} database={props.database} saveLike="saved" />;
  } else if (index == 3) {
    rightPanel = <LikeHistorySaved {...props} database={props.database} saveLike="likeHistory" />;
    mobileScreen = <LikeHistorySaved {...props} database={props.database} saveLike="likeHistory" />;
  } else if (index == 4) {
    rightPanel = <DocAccountVerification />;
    mobileScreen = <DocAccountVerification />;
  } else {
    rightPanel = <AccountSettings />;
    mobileScreen = <AccountSettings />;
  }



  return (
    <div>
      <Navbar currentPage='account' />
      <Hidden smDown>
        <div className={classes.covidBox} style={{ position: "relative" }}>
          <CovidAlert />
        </div>
        <Grid container spacing={0}>
          <Grid item md={4} lg={3}>
            <DocSideNav />
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

