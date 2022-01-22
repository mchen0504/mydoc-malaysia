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

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import FavoriteIcon from "@material-ui/icons/Favorite";

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// for small cards display, might delete later if naming conventions unify

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

  // decide if the page should render Like History or Saved
  const displayType = props.saveLike;

  const [display, setDisplay] = React.useState("doctor"); //display by doctor as default
  const [doctorCards, setDoctorCards] = React.useState([]); //display by doctor as default
  const [hospitalCards, setHospitalCards] = React.useState([]); //display by doctor as default
  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

  const [renderCount, setRenderCount] = React.useState(0);

  const [databaseInfo, setDatabase] = React.useState({});

  useEffect(() => {
    displayStoredCredentials();
  }, []);

  const displayStoredCredentials = () => {
    getStoredCredentials()
      .then((res) => {
        let stored = res[0].data.credentials[displayType];
        let likedDoctors;
        let likedHospitals;

        // if the user has not never liked any doctors or hospitals
        if (!stored) {
          likedDoctors = [];
          likedHospitals = [];
        } else {
          likedDoctors = stored.doctors ? stored.doctors : [];
          likedHospitals = stored.hospitals ? stored.hospitals : [];
        }

        let docCardsList =
          likedDoctors.length === 0 ? (
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
            likedDoctors.map((doctor) => {
              let specialty = doctor.specialty;
              let hospital = doctor.hospital.replace(/\s+/g, "");
              let username = doctor.username.replace(/\s+/g, "");
              let targetDoc =
                res[1].data[specialty]["hospitals"][hospital]["doctors"][
                  username
                ];
              return (
                <DocCard
                  {...props}
                  key={doctor.username}
                  targetDoc={targetDoc}
                  targetDocUserName={username}
                  displayType={displayType}
                />
              );
            })
          );

        // list of liked hospitals cards on hospital tab
        let hosCardsList =
          likedHospitals.length === 0 ? (
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
            likedHospitals.map((hospital) => {
              let specialty = hospital.relatedSpecialty;
              let hospitalUserName = hospital.name.replace(/\s+/g, "");
              let targetHos =
                res[1].data[specialty]["hospitals"][hospitalUserName];
              return (
                <HospitalCard
                  {...props}
                  key={hospital.name}
                  targetHos={targetHos}
                  targetHosUserName={hospitalUserName}
                  hospitalInfo={hospital}
                  displayType={displayType}
                  database={databaseInfo}
                />
              );
            })
          );

        setDoctorCards(docCardsList);
        setHospitalCards(hosCardsList);
        setRenderCount(1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let getStoredCredentials = async () => {
    try {
      let userStoredCredentials = await axios.get("/user");
      console.log(userStoredCredentials);
      let databaseInfo = await axios.get("/alldata");
      return [userStoredCredentials, databaseInfo];
    } catch (err) {
      console.log(err);
    }
  };

  if (renderCount === 0) {
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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// might be deleted later if naming conventions unify

// Each indiivdual doctor card
function DocCard(props) {
  const classes = useStyles();

  let language = "";
  props.targetDoc["languages"].forEach((lang) => {
    language = language + ", " + lang;
  });
  language = language.substring(1);

  const clickDoctorCard = () => {
    let newestTargetDoc = props.targetDoc;
    newestTargetDoc["Address"] = newestTargetDoc.address;
    newestTargetDoc["Language"] = newestTargetDoc.languages;
    newestTargetDoc["Phone"] = newestTargetDoc.phone;
    newestTargetDoc["Hospital"] = newestTargetDoc.hospital;
    newestTargetDoc["Conditions"] = newestTargetDoc.conditions;
    newestTargetDoc["DocName"] = newestTargetDoc.name;
    newestTargetDoc["Specialty"] = newestTargetDoc.specialty;
    newestTargetDoc["YearsofPractice"] = newestTargetDoc.yearsOfPractice;
    newestTargetDoc["Procedures"] = newestTargetDoc.procedures;
    newestTargetDoc["NumberOfLikes"] = newestTargetDoc.likes;
    newestTargetDoc["Qualifications"] = newestTargetDoc.qualifications;
    newestTargetDoc["Type"] = newestTargetDoc.type;
    newestTargetDoc["userName"] = props.targetDocUserName;
    props.updateTargetDoc(newestTargetDoc);
    props.setProfileBackToDestination(props.displayType);
    if (props.history != null) {
      props.history.push("/docprofile");
    }
  };

  return (
    <Card
      style={{ cursor: "pointer" }}
      className={classes.root}
      onClick={clickDoctorCard}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {/* doctor image */}
          <CardMedia
            component="img"
            className={classes.img}
            // image={docImg}
            src={props.targetDoc.imgSrc}
          ></CardMedia>
        </Grid>
        <Grid item xs={12} sm={7}>
          <CardContent>
            {/* doctor details */}
            <Typography variant="h6" color="primary">
              {"Dr. " + props.targetDoc.name}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Specialty: </strong>{" "}
              <span>{props.targetDoc.specialty}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Hospital: </strong>
              <span>{props.targetDoc["hospital"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Languages: </strong>
              <span>{language}</span>
            </Typography>
            <br></br>
            {/* private tag */}
            <Chip
              color="secondary"
              size="small"
              label={props.targetDoc.type}
            ></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* Like icon + number of likes */}
          <Box className={classes.likeBox}>
            <FavoriteIcon style={{ color: "red" }} />
            <Typography variant="body2" color="primary">
              {props.targetDoc["likes"]
                ? props.targetDoc["likes"].toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
                  })
                : 0}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

function HospitalCard(props) {
  const classes = useStyles();

  const clickHospitalCard = () => {
    let newestTargetHos = props.targetHos;

    newestTargetHos["Address"] = newestTargetHos.address;
    newestTargetHos["HospitalType"] = newestTargetHos.type;
    newestTargetHos["Insurance"] = newestTargetHos.insurance;
    newestTargetHos["Language"] = newestTargetHos.languages;
    newestTargetHos["Phone"] = newestTargetHos.phone;
    newestTargetHos["HospitalName"] = newestTargetHos.name;
    newestTargetHos["RelateSpecialty"] = newestTargetHos.relatedSpecialty;
    newestTargetHos["Tags"] = newestTargetHos.tags;
    newestTargetHos["Web"] = newestTargetHos.website;

    let conditionList = [];
    for (let doctor in newestTargetHos["doctors"]) {
      let targetDoc = newestTargetHos["doctors"][doctor];
      targetDoc.conditions = targetDoc.conditions.map((item) => {
        let newItem = item.toLowerCase();
        newItem = newItem.replace(newItem[0], newItem[0].toUpperCase());
        return newItem;
      });
      targetDoc.conditions.forEach((condition) => {
        if (conditionList.indexOf(condition) == -1) {
          conditionList.push(condition);
        }
      });
    }
    newestTargetHos["Conditions"] = conditionList;
    props.updateTargetHos(newestTargetHos);
    props.setProfileBackToDestination(props.displayType);
    if (props.history != null) {
      props.history.push("/hospprofile");
    }
  };

  return (
    <Card
      style={{ cursor: "pointer" }}
      className={classes.root}
      onClick={clickHospitalCard}
    >
      <Grid container spacing={0}>
        <Grid item xs={12} sm={3} className={classes.imageGrid}>
          {/* hospital logo image */}
          <CardMedia
            component="img"
            className={classes.img}
            image={props.targetHos["imgSrc"]}
          ></CardMedia>
        </Grid>

        <Grid item xs={12} sm={7}>
          <CardContent>
            {/* hospital details */}
            <Typography variant="h6" color="primary">
              {props.targetHos["name"]}
            </Typography>
            <br></br>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Address: </strong>
              <span>{props.targetHos["address"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Related Specialty: </strong>
              <span>{props.targetHos["relatedSpecialty"]}</span>
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              <strong>Phone: </strong>
              <span>{props.targetHos["phone"]}</span>
            </Typography>

            <br></br>
            <Chip
              color="secondary"
              size="small"
              label={props.targetHos.type}
            ></Chip>
          </CardContent>
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* like icon + number of likes */}
          <Box className={classes.likeBox}>
            <FavoriteIcon style={{ color: "red" }} />
            <Typography variant="body2" color="primary">
              {props.targetHos["likes"].toLocaleString(navigator.language, {
                minimumFractionDigits: 0,
              })}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LikeHistorySaved;
