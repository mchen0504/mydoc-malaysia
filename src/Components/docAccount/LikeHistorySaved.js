import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

import axios from "axios";

import savedLikeNoResultsFound from "../../img/savedLikeNoResultsFound.png";
import DocCard from "../results/DocCard";
import HospitalCard from "../results/HospitalCard";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  ...theme.account,

  root: {
    display: "flex",
    margin: 30,
  },

  img: {
    width: "60%",
    [theme.breakpoints.only("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "40%",
    },
  },

  imageGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 30,
      marginBottom: 10,
    },
  },

  likeBox: {
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
      alignItems: "flex-start",
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
    },
  },

  noResultImg: {
    objectFit: "cover",
    width: "90%",
    height: "90%",
  },
}));

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function LikeHistorySaved(props) {
  const classes = useStyles();
  const { userInfo } = props;

  // decide if the page should render Like History or Saved
  const displayType = props.saveLike;

  const [display, setDisplay] = React.useState("doctor"); //display by doctor as default
  // const [doctorCards, setDoctorCards] = React.useState([]); //display by doctor as default
  // const [hospitalCards, setHospitalCards] = React.useState([]); //display by doctor as default

  const [stored, setStored] = React.useState({
    username: "",
    doctors: [],
    hospitals: [],
  });

  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

  const [renderCount, setRenderCount] = React.useState(0);

  const [databaseInfo, setDatabase] = React.useState({});

  useEffect(() => {
    let doctors = [];
    let hospitals = [];

    let stored = userInfo[displayType];
    if (stored) {
      doctors = stored.doctors ? stored.doctors : [];
      hospitals = stored.hospitals ? stored.hospitals : [];
    }

    setStored({
      username: userInfo.username,
      doctors,
      hospitals,
    });
  }, [userInfo]);

  const doctorCards =
    stored.doctors?.length === 0 ? (
      <Box
        display="flex"
        justifyContent="center"
        style={{ marginTop: "none", marginLeft: "15%" }}
      >
        <div style={{ maxWidth: 600 }}>
          <img
            className={classes.noResultImg}
            src={savedLikeNoResultsFound}
            alt="searchNotFoundImg"
          />
        </div>
      </Box>
    ) : (
      stored.doctors?.map((doctor) => {
        // let specialty = doctor.specialty;
        // let hospital = doctor.hospital.replace(/\s+/g, "");
        // let username = doctor.username.replace(/\s+/g, "");
        // let targetDoc =
        //   res[1].data[specialty]["hospitals"][hospital]["doctors"][username];
        return (
          <DocCard
            {...props}
            key={doctor.username}
            docInfo={doctor}
            // targetDocUserName={username}
            displayType={displayType}
          />
        );
      })
    );

  // list of liked hospitals cards on hospital tab
  let hospitalCards =
    stored.hospitals?.length === 0 ? (
      <Box
        display="flex"
        justifyContent="center"
        style={{ marginTop: "none", marginLeft: "15%" }}
      >
        <div style={{ maxWidth: 600 }}>
          <img
            className={classes.noResultImg}
            src={savedLikeNoResultsFound}
            alt="searchNotFoundImg"
          />
        </div>
      </Box>
    ) : (
      stored.hospitals?.map((hospital) => {
        // let specialty = hospital.relatedSpecialty;
        // let hospitalUserName = hospital.name.replace(/\s+/g, "");
        // let targetHos = res[1].data[specialty]["hospitals"][hospitalUserName];
        return (
          <HospitalCard
            {...props}
            key={hospital.name}
            hospInfo={hospital}
            // targetHos={targetHos}
            // targetHosUserName={hospitalUserName}
            // hospitalInfo={hospital}
            displayType={displayType}
            database={databaseInfo}
          />
        );
      })
    );

  if (!stored.username) {
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "5%" }}
        />
      </div>
    );
  } else {
    return (
      <a id="likehistory" className={classes.anchor}>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={8}>
            <Box
              display="flex"
              mt={4}
              mb={3}
              flexWrap="wrap"
              alignItems="center"
            >
              <Box flexGrow={1} flexDirection="row" mb={1}>
                <Typography variant="h5" color="primary">
                  {/* Back button, 手机屏幕才会出现 */}
                  <Hidden mdUp>
                    {/* <IconButton> */}
                    <Link to="account">
                      <ArrowBackIosIcon
                        className={classes.backIcon}
                        fontSize="small"
                      />
                    </Link>
                    {/* </IconButton> */}
                  </Hidden>
                  <strong>
                    {displayType === "likeHistory" ? "Like History" : "Saved"}
                  </strong>
                </Typography>
              </Box>
              {/* Display by Doctor/Hospital buttons */}
              <Box>
                <ToggleButtonGroup
                  value={display}
                  exclusive
                  onChange={handleDisplay}
                >
                  <ToggleButton value="doctor" color="primary">
                    <Typography
                      color="primary"
                      style={{ textTransform: "none" }}
                    >
                      Doctor
                    </Typography>
                  </ToggleButton>
                  <ToggleButton value="hospital">
                    <Typography
                      color="primary"
                      style={{ textTransform: "none" }}
                    >
                      Hospital
                    </Typography>
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>{" "}
            </Box>

            <br></br>
            <br></br>

            {/* if user clicks on display by 'doctor', then render doctor cards */}
            {display === "doctor" ? (
              <Fragment>{doctorCards}</Fragment>
            ) : (
              <Fragment>{hospitalCards}</Fragment>
            )}
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      </a>
    );
  }
}

export default LikeHistorySaved;
