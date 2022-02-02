import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";

import savedLikeNoResultsFound from "../../img/savedLikeNoResultsFound.png";
import DocCard from "../results/DocCard";
import HospitalCard from "../results/HospitalCard";

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

function LikeHistorySaved(props) {
  const classes = useStyles();
  const { userInfo } = props;

  // decide if the page should render Like History or Saved
  const displayType = props.saveLike;

  const [display, setDisplay] = useState("doctor"); //display by doctor by default
  const [stored, setStored] = useState({
    username: "",
    doctors: [],
    hospitals: [],
  });

  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

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
        return (
          <DocCard
            {...props}
            key={doctor.username}
            docInfo={doctor}
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
        return (
          <HospitalCard
            {...props}
            key={hospital.name}
            hospInfo={hospital}
            displayType={displayType}
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
