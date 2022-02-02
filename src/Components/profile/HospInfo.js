import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";

import CovidAlert from "../Alert";
import HospTags from "./HospTags";

import {
  changeHospLikeStatus,
  changeHospSaveStatus,
  sendReportedHospitals,
} from "../../redux/actions/userActions";
import {
  updateHospitalLikes,
  reportHospital,
} from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },

  //return to hospital button
  returnBox: {
    marginLeft: 50,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 20,
    },
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  profileGrid: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: 20,
      marginRight: 20,
    },
  },

  line: {
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },

  signUpInButton: {
    paddingLeft: "7.5rem",
  },
}));

//for hospital image + basic info + likes
//edit tags section is imported from HospTags.js

function HospInfo(props) {
  const classes = useStyles();
  const { hospInfo, userInfo } = props;
  const history = useHistory();

  const authenticated = props.authenticated;

  // const backToRes = () => {
  //   if (props.history !== null) {
  //     if (props.backTo === "resultsPage") {
  //       props.history.push("/results");
  //     } else if (props.backTo === "hospprofile") {
  //       props.history.push("/results");
  //     } else if (props.backTo === "likeHistory") {
  //       props.history.push("/likehistory");
  //     } else {
  //       props.history.push("/saved");
  //     }
  //   }
  // };

  // let returnPageDesc;
  // if (props.backTo === "resultsPage") {
  //   returnPageDesc = "Result Page";
  // } else if (props.backTo === "hospprofile") {
  //   returnPageDesc = "Result Page";
  // } else if (props.backTo === "likeHistory") {
  //   returnPageDesc = "Liked History Page";
  // } else {
  //   returnPageDesc = "Saved History Page";
  // }

  const [likeSaveInfo, setState] = React.useState({
    hasLiked: false,
    likedList: [],
    numLikes: 0,

    hasSaved: false,
    savedList: [],

    reportedList: [],
    numReports: 0,
    reportReasonsList: [],
    oneReason: "",
  });

  const getUserLikeSaveInfo = (userInfo, type) => {
    let list = [];
    let likedSaved = false;

    if (userInfo && userInfo[type] && userInfo[type].hospitals) {
      list = userInfo[type].hospitals;
      const index = userInfo[type].hospitals.findIndex(
        (hospital) =>
          hospital.name.replace(/\s/g, "").toLowerCase() ===
          hospInfo.name.replace(/\s/g, "").toLowerCase()
      );
      if (index !== -1) {
        likedSaved = true;
      }
    }
    return [list, likedSaved];
  };

  useEffect(() => {
    const [listOfLikes, liked] = getUserLikeSaveInfo(userInfo, "likeHistory");
    const [listOfSaves, saved] = getUserLikeSaveInfo(userInfo, "saved");

    const listOfReports = [];
    if (userInfo && userInfo.reportedHospitals) {
      listOfReports = userInfo.reportedHospitals;
    }

    setState({
      hasLiked: liked,
      likedList: listOfLikes,
      numLikes: hospInfo.likes ? hospInfo.likes : 0,

      hasSaved: saved,
      savedList: listOfSaves,

      reportedList: listOfReports,
      numReports: hospInfo.report ? hospInfo.report.reportCount : 0,
      reportReasonsList: hospInfo.report ? hospInfo.report.reportReasons : [],
      oneReason: "",
    });
  }, [hospInfo, userInfo]);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LIKE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the like button is pressed
  const toggleLikeUnlike = () => {
    let newLikedList = [...likeSaveInfo.likedList];
    let newLikes = likeSaveInfo.numLikes;
    if (likeSaveInfo.hasLiked) {
      let index = newLikedList.findIndex(
        (hospital) => hospital.name === hospInfo.name
      );
      // remove this hospital from the user like list
      newLikedList.splice(index, 1);
      newLikes = newLikes - 1;
      setState((prevState) => ({
        ...prevState,
        numLikes: newLikes,
        hasLiked: false,
        likedList: newLikedList,
      }));
    } else {
      newLikes = newLikes + 1;
      const newHospInfo = {
        name: hospInfo.name,
        relatedSpecialty: hospInfo.relatedSpecialty,
        address: hospInfo.address,
        phone: hospInfo.phone,
        type: hospInfo.type,
        imgSrc: hospInfo.imgSrc,
        likes: newLikes,
      };
      newLikedList.push(newHospInfo);
      setState((prevState) => ({
        ...prevState,
        numLikes: newLikes,
        hasLiked: true,
        likedList: newLikedList,
      }));
    }

    let updateInfo = {
      hospital: hospInfo.name,
      specialty: hospInfo.relatedSpecialty,
      likes: newLikes,
    };

    toggleLike(updateInfo, newLikedList);
  };

  const toggleLike = (updateInfo, likedList) => {
    props.changeHospLikeStatus(likedList);
    props.updateHospitalLikes(updateInfo);
  };

  // if the user has liked this hospital before: filled heart, otherwise outlined heart
  const LikeIcon = likeSaveInfo.hasLiked
    ? FavoriteIcon
    : FavoriteBorderOutlinedIcon;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SAVE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the save button is pressed
  const toggleSaveUnsave = () => {
    let newSavedList = [...likeSaveInfo.savedList];
    if (likeSaveInfo.hasSaved) {
      let index = newSavedList.findIndex(
        (hospital) => hospital.name === hospInfo.name
      );
      // remove this hospital from the user saved list
      newSavedList.splice(index, 1);
      setState((prevState) => ({
        ...prevState,
        savedList: newSavedList,
        hasSaved: false,
      }));
    } else {
      let newHospInfo = {
        name: hospInfo.name,
        relatedSpecialty: hospInfo.relatedSpecialty,
        address: hospInfo.address,
        phone: hospInfo.phone,
        type: hospInfo.type,
        imgSrc: hospInfo.imgSrc,
        likes: likeSaveInfo.numLikes,
      };
      newSavedList.push(newHospInfo);
      setState((prevState) => ({
        ...prevState,
        savedList: newSavedList,
        hasSaved: true,
      }));
    }
    props.changeHospSaveStatus(newSavedList);
  };

  const SaveIcon = likeSaveInfo.hasSaved
    ? BookmarkIcon
    : BookmarkBorderOutlinedIcon;

  // ----------------------------Report---------------------------------------- //
  const [reportOpen, setReportOpen] = React.useState(false);
  const handleReportOpen = () => {
    setReportOpen(true);
  };

  const handleReportClose = () => {
    setReportOpen(false);
  };

  const handleReportReason = (event) => {
    const oneReason = event.target.value;
    setState({
      ...likeSaveInfo,
      oneReason: oneReason,
    });
  };

  const reported = likeSaveInfo.reportedList.includes(hospInfo?.name);

  // send hospital report to database
  const submitReport = () => {
    const oneReason = likeSaveInfo.oneReason;
    const reasons = likeSaveInfo.reportReasonsList;
    reasons.push(oneReason);
    const reportedList = likeSaveInfo.reportedList;
    if (!reported) {
      reportedList.push(hospInfo.name);
    }

    // send to specialty doctor profile
    const oneReport = {
      reportCount: likeSaveInfo.numReports + 1,
      reportReasons: reasons,
      specialty: hospInfo.relatedSpecialty,
      hospital: hospInfo.name,
    };
    props.reportHospital(oneReport);

    // send to user account
    const sendToAccount = {
      reportedHospitals: reportedList,
    };
    props.sendReportedHospitals(sendToAccount);

    setReportOpen(false);
    setState((prevState) => ({
      ...likeSaveInfo,
      numReports: prevState.numReports + 1,
      reportReasonsList: [prevState.reportReasonsList, oneReason],
      oneReason: "",
      reportedList: [prevState.reportedList, hospInfo.name],
    }));
  };

  // ~~~~~~~~~~~sign up or login in if want to save or report~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [loginOpen, setLoginOpen] = React.useState({
    open: false,
    // keep track of what function the user selects (report, like, save, tag)
    userOption: "",
  });

  const handleLoginOpen = (option) => {
    setLoginOpen({
      open: true,
      userOption: option,
    });
  };

  const handleLoginClose = () => {
    setLoginOpen({
      ...loginOpen,
      open: false,
    });
  };

  // for login in diagolue: render correponding icon for user option: recommend, like, save
  let Icon = FavoriteIcon;

  if (loginOpen.userOption === "Recommend") {
    Icon = FavoriteIcon;
  } else if (loginOpen.userOption === "Save") {
    Icon = BookmarkBorderOutlinedIcon;
  } else if (loginOpen.userOption === "Report") {
    Icon = ErrorOutlineOutlinedIcon;
  } else {
    Icon = EditOutlinedIcon;
  }

  return (
    <div>
      <div className={classes.covidBox}>
        <CovidAlert />
      </div>

      {/* For 'return to hospitals' button*/}
      <Box display="flex" mt={3} mb={3} className={classes.returnBox}>
        {/* <Button
          style={{ fontSize: 16, textTransform: "none" }}
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={backToRes}
        >
          Return to {returnPageDesc}
        </Button> */}
      </Box>

      {/* mobile view: image on top, like icon on upper right*/}
      <Hidden smUp>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={3}></Grid>
          <Grid item xs={6} align="center">
            {/* hospital image */}
            <div style={{ width: 150, height: 180 }}>
              <img
                className={classes.img}
                src={hospInfo?.imgSrc}
                alt="hospimg"
              />
            </div>
          </Grid>
          {/* Like icon + number of likes */}
          <Grid item xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {authenticated ? (
                <IconButton onClick={toggleLikeUnlike}>
                  <LikeIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                <Fragment>
                  <IconButton onClick={() => handleLoginOpen("Recommend")}>
                    <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                  </IconButton>
                </Fragment>
              )}{" "}
              )}
              {/* like count */}
              <Typography variant="body2" color="primary">
                {likeSaveInfo.numLikes.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Hidden>

      <Grid container spacing={0}>
        <Grid item xs={12} sm={5} md={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* desktop view: image on the left */}
            <Hidden xsDown>
              {/* hospital image */}
              <div style={{ width: 200, height: 250 }}>
                <img
                  className={classes.img}
                  src={hospInfo?.imgSrc}
                  alt="hospimg"
                />
              </div>
            </Hidden>

            {/* mobile view: name below image */}
            <Hidden smUp>
              <Typography variant="h5" color="primary" style={{ margin: 20 }}>
                {hospInfo?.name}
              </Typography>
            </Hidden>

            <Box display="flex" mt={2}>
              {/* report button */}

              {authenticated ? (
                <Button
                  disabled={reported}
                  startIcon={<ErrorOutlineOutlinedIcon />}
                  style={{ textTransform: "none" }}
                  color="primary"
                  onClick={handleReportOpen}
                >
                  Report
                </Button>
              ) : (
                <Fragment>
                  <Button
                    startIcon={<ErrorOutlineOutlinedIcon />}
                    style={{ textTransform: "none" }}
                    color="primary"
                    onClick={() => handleLoginOpen("Report")}
                  >
                    Report
                  </Button>

                  {/* login dialog asking user to sign in if they want to report, save, or like */}
                  <Dialog
                    fullWidth="true"
                    maxWidth="sm"
                    open={loginOpen.open}
                    onClose={handleLoginClose}
                  >
                    <Box display="flex" alignItems="center">
                      <Box flexGrow={1}>
                        <DialogTitle>
                          {loginOpen.userOption} a Hospital
                        </DialogTitle>
                      </Box>
                      <Box>
                        <DialogActions>
                          <IconButton
                            size="small"
                            onClick={handleLoginClose}
                            color="primary"
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogActions>
                      </Box>
                    </Box>
                    <DialogContent>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Icon style={{ color: "red" }} />
                        <br></br>
                        <Typography variant="body1" align="center">
                          You need to sign in to{" "}
                          {loginOpen.userOption.toLowerCase()} this hospital
                        </Typography>
                      </Box>
                      <Box display="flex" mt={2} mb={2}>
                        <Button
                          className={classes.signUpInButton}
                          variant="contained"
                          color="primary"
                          style={{ textTransform: "none" }}
                          fullWidth
                          component={Link}
                          to="/login"
                        >
                          Log in                         
                        </Button>
                      </Box>

                      <Box display="flex" mb={2}>
                        <Button
                          className={classes.signUpInButton}
                          variant="outlined"
                          color="primary"
                          style={{ textTransform: "none" }}
                          fullWidth
                          component={Link}
                          to="/signup"
                        >
                          Sign up                         
                        </Button>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Fragment>
              )}

              <Dialog
                fullWidth="true"
                maxWidth="sm"
                open={reportOpen}
                onClose={handleReportClose}
              >
                <Box display="flex" alignItems="center">
                  <Box flexGrow={1}>
                    <DialogTitle>Report</DialogTitle>
                  </Box>
                  <Box>
                    <DialogActions>
                      <IconButton
                        size="small"
                        onClick={handleReportClose}
                        color="primary"
                      >
                        <CloseIcon />
                      </IconButton>
                    </DialogActions>
                  </Box>
                </Box>
                <DialogContent>
                  <Typography variant="body1">
                    Please provide a reason for why you are reporting this
                    hospital:
                  </Typography>
                  <br></br>
                  <TextField
                    fullWidth
                    multiline
                    required
                    variant="outlined"
                    label="Reason"
                    rows={5}
                    onChange={handleReportReason}
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    className={classes.reportButton}
                    disabled={!likeSaveInfo.oneReason}
                    variant="contained"
                    color="primary"
                    style={{ textTransform: "none" }}
                    onClick={submitReport}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {/* save button */}

              {authenticated ? (
                <Button
                  startIcon={<SaveIcon />}
                  style={{ textTransform: "none" }}
                  color="primary"
                  onClick={toggleSaveUnsave}
                >
                  Save
                </Button>
              ) : (
                <Fragment>
                  <Button
                    startIcon={<SaveIcon />}
                    style={{ textTransform: "none" }}
                    color="primary"
                    onClick={() => handleLoginOpen("Save")}
                  >
                    Save
                  </Button>
                </Fragment>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          {/* desktop view: name on the right */}
          <Hidden xsDown>
            <Typography variant="h5" color="primary">
              {hospInfo?.name}
              {/* private tag */}
              <Chip
                style={{ marginLeft: 10 }}
                color="primary"
                size="small"
                label="Private"
              ></Chip>
            </Typography>
          </Hidden>

          {/* mobile view: thicker divider */}
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>

          {/* hospital basic info */}
          <Box className={classes.profileGrid} mt={3} mb={3}>
            <Typography variant="body1" color="textPrimary">
              <strong>Official website: </strong>{" "}
              <a href={hospInfo?.website} style={{ color: "#003367" }}>
                Link
              </a>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Hours: </strong> <span>Open {hospInfo?.hours}</span>
            </Typography>

            <Hidden smUp>
              <Typography variant="body1" color="textPrimary">
                <strong>Hospital Type: </strong> {/* private tag */}
                <Chip
                  style={{ marginLeft: 10 }}
                  color="primary"
                  size="small"
                  label={hospInfo?.type}
                ></Chip>
              </Typography>
            </Hidden>

            <br></br>

            <Box display="flex" flexDirection="row" mt={1}>
              <LocationOnOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{hospInfo?.address}</span>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <PhoneOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{hospInfo?.phone}</span>
              </Typography>
            </Box>
          </Box>
          {/* edit Tag component */}
          <HospTags
            hospInfo={hospInfo}
            userInfo={userInfo}
            handleLoginOpen={handleLoginOpen}
          />
        </Grid>

        <Grid item xs={12} sm={1} md={2}>
          {/* desktop view: like icon on the right */}
          <Hidden xsDown>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {authenticated ? (
                <IconButton onClick={toggleLikeUnlike}>
                  <LikeIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                <Fragment>
                  <IconButton onClick={() => handleLoginOpen("Recommend")}>
                    <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                  </IconButton>
                </Fragment>
              )}
              <Typography variant="body2" color="primary">
                {likeSaveInfo.numLikes.toLocaleString(navigator.language, {
                  minimumFractionDigits: 0,
                })}
              </Typography>
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}

HospInfo.propTypes = {
  // like
  changeHospLikeStatus: PropTypes.func.isRequired,
  updateHospitalLikes: PropTypes.func.isRequired,
  // save
  changeHospSaveStatus: PropTypes.func.isRequired,
  // report
  sendReportedHospitals: PropTypes.func.isRequired,
  reportHospital: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionsToProps = {
  changeHospLikeStatus,
  updateHospitalLikes,
  changeHospSaveStatus,
  sendReportedHospitals,
  reportHospital,
};

export default connect(mapStateToProps, mapActionsToProps)(HospInfo);
