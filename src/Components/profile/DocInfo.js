import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import {
  changeDocLikeStatus,
  changeDocSaveStatus,
  sendReportedDoctors,
} from "../../redux/actions/userActions";
import {
  updateDoctorLikes,
  reportDoctor,
} from "../../redux/actions/dataActions";

import CovidAlert from "../Alert";
import DocTags from "./DocTags";

const useStyles = makeStyles((theme) => ({
  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },

  //return to doctors button
  returnBox: {
    marginLeft: 50,
    [theme.breakpoints.down("sm")]: {
      marginLeft: 20,
    },
  },

  //doctor image
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

  reportButton: {
    marginRight: "1rem",
  },

  signUpInButton: {
    paddingLeft: "7.5rem",
  },
}));

//for Doc image + basic info + likes
//edit tags section is imported from DocTags.js

function DocInfo(props) {
  const classes = useStyles();
  const { docInfo, userInfo } = props;

  // const backToRes = () => {
  //   if (props.history !== null) {
  //     if (props.backTo === "resultsPage") {
  //       props.history.push("/results");
  //     } else if (props.backTo === "hospprofile") {
  //       let specialty = docInfo.specialty.replace(" & ", "-");
  //       let hospital = docInfo.hospital.replace(/\s+/g, "-");
  //       props.history.push(`/profile/${hospital}/${specialty}`);
  //     } else if (props.backTo === "likeHistory") {
  //       props.history.push("/likehistory");
  //     } else {
  //       props.history.push("/saved");
  //     }
  //   }
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   history.push("/results/Specialty/Gastroenterology");
  // };

  const authenticated = props.authenticated;

  const [likeSaveInfo, setState] = useState({
    // like functionality
    hasLiked: false,
    likedList: [],
    numLikes: 0,
    // save functionality
    hasSaved: false,
    savedList: [],
    // report functionality
    reportedList: [],
    numReports: 0,
    reportReasonsList: [],
    oneReason: "",
  });

  const getUserLikeSaveInfo = (userInfo, type) => {
    let list = [];
    let likedSaved = false;

    if (userInfo && userInfo[type] && userInfo[type].doctors) {
      list = userInfo[type].doctors;
      // if the user has liked this particular doctor before
      const index = userInfo[type].doctors.findIndex(
        (doctor) =>
          doctor.username?.replace(/\s/g, "").toLowerCase() ===
          docInfo.username?.replace(/\s/g, "").toLowerCase()
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
    if (userInfo && userInfo.reportedDoctors) {
      listOfReports = userInfo.reportedDoctors;
    }

    setState({
      hasLiked: liked,
      likedList: listOfLikes,
      numLikes: docInfo.likes ? docInfo.likes : 0,

      hasSaved: saved,
      savedList: listOfSaves,

      reportedList: listOfReports,
      numReports: docInfo.report ? docInfo.report.reportCount : 0,
      reportReasonsList: docInfo.report ? docInfo.report.reportReasons : [],

      oneReason: "",
    });
  }, []);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LIKE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the like button is pressed
  const toggleLikeUnlike = () => {
    let newLikedList = [...likeSaveInfo.likedList];
    let newLikes = likeSaveInfo.numLikes;
    if (likeSaveInfo.hasLiked) {
      let index = newLikedList.findIndex(
        (doctor) => doctor.username === docInfo.username
      );
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
      let newDocInfo = {
        hospital: docInfo.hospital,
        specialty: docInfo.specialty,
        username: docInfo.username,
        name: docInfo.name,
        imgSrc: docInfo.imgSrc,
        languages: docInfo.languages,
        type: docInfo.type,
        likes: newLikes,
      };
      newLikedList.push(newDocInfo);
      setState((prevState) => ({
        ...prevState,
        numLikes: newLikes,
        hasLiked: true,
        likedList: newLikedList,
      }));
    }

    let updateInfo = {
      specialty: docInfo.specialty,
      hospital: docInfo.hospital,
      username: docInfo.username,
      likes: newLikes,
    };
    toggleLike(updateInfo, newLikedList);
  };

  const toggleLike = (updateInfo, likedList) => {
    props.changeDocLikeStatus(likedList);
    props.updateDoctorLikes(updateInfo);
  };

  // if the user has liked this doctor before: filled heart, otherwise outlined heart
  const LikeIcon = likeSaveInfo.hasLiked
    ? FavoriteIcon
    : FavoriteBorderOutlinedIcon;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SAVE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the save button is pressed
  const toggleSaveUnsave = () => {
    let newSavedList = [...likeSaveInfo.savedList];
    if (likeSaveInfo.hasSaved) {
      let index = newSavedList.findIndex(
        (doctor) => doctor.username === docInfo.username
      );
      newSavedList.splice(index, 1);
      setState((prevState) => ({
        ...prevState,
        savedList: newSavedList,
        hasSaved: false,
      }));
    } else {
      let newDocInfo = {
        hospital: docInfo.hospital,
        specialty: docInfo.specialty,
        username: docInfo.username,
        name: docInfo.name,
        imgSrc: docInfo.imgSrc,
        languages: docInfo.languages,
        type: docInfo.type,
        likes: likeSaveInfo.numLikes,
      };
      newSavedList.push(newDocInfo);
      setState((prevState) => ({
        ...prevState,
        savedList: newSavedList,
        hasSaved: true,
      }));
    }
    props.changeDocSaveStatus(newSavedList);
  };

  const SaveIcon = likeSaveInfo.hasSaved
    ? BookmarkIcon
    : BookmarkBorderOutlinedIcon;

  // ----------------------------Report---------------------------------------- //
  //report弹窗：填的表
  const [reportOpen, setReportOpen] = useState(false);
  const handleReportOpen = () => {
    setReportOpen(true);
  };

  // 关闭report的表
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

  const reported = likeSaveInfo.reportedList.includes(docInfo?.username);
  // reportedList
  // send report to database
  const submitReport = () => {
    const oneReason = likeSaveInfo.oneReason;
    const reasons = likeSaveInfo.reportReasonsList;
    reasons.push(oneReason);
    let reportedList = likeSaveInfo.reportedList;
    if (!reported) {
      reportedList.push(docInfo.username);
    }

    // send to specialty doctor profile
    const oneReport = {
      reportCount: likeSaveInfo.numReports + 1,
      reportReasons: reasons,

      specialty: docInfo.specialty,
      hospital: docInfo.hospital,
      username: docInfo.username,
    };
    props.reportDoctor(oneReport);

    // send to user account
    const sendToAccount = {
      reportedDoctors: reportedList,
    };
    props.sendReportedDoctors(sendToAccount);

    setReportOpen(false);
    setState((prevState) => ({
      ...likeSaveInfo,
      numReports: prevState.numReports + 1,
      reportReasonsList: [prevState.reportReasonsList, oneReason],
      oneReason: "",
      reportedList: [prevState.reportedList, docInfo.username],
    }));
  };

  // ~~~~~~~~~~~Sign up or login in if want to save or report~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  const [loginOpen, setLoginOpen] = useState({
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

  // let returnPageDesc;
  // if (props.backTo === "resultsPage") {
  //   returnPageDesc = "Result Page";
  // } else if (props.backTo === "hospprofile") {
  //   returnPageDesc = "Hospital Profile";
  // } else if (props.backTo === "likeHistory") {
  //   returnPageDesc = "Like History";
  // } else {
  //   returnPageDesc = "Saved";
  // }

  return (
    <div>
      <div className={classes.covidBox}>
        <CovidAlert />
      </div>

      {/* For 'return to doctors' button */}
      <Box display="flex" mt={3} mb={3} className={classes.returnBox}>
        {/* <Button
          style={{ fontSize: 16, textTransform: "none" }}
          color="primary"
          onClick={backToRes}
          startIcon={<ArrowBackIosIcon />}
        >
          Return to {returnPageDesc}
        </Button> */}
      </Box>

      {/* mobile view: doctor's image on top and like icon in upper right hand*/}
      <Hidden smUp>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={3}></Grid>
          <Grid item xs={6} align="center">
            {/* doctor image */}
            <div style={{ width: 150, height: 180 }}>
              <img className={classes.img} src={docInfo?.imgSrc} alt="docimg" />
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
            {/* desktop view: doctor image on the left */}
            <Hidden xsDown>
              {/* doctor image */}
              <div style={{ width: 200, height: 250 }}>
                <img
                  className={classes.img}
                  src={docInfo?.imgSrc}
                  alt="docimg"
                />
              </div>
            </Hidden>

            {/* mobile view: name below image */}
            <Hidden smUp>
              <Typography variant="h5" color="primary" style={{ margin: 20 }}>
                {"Dr. " + docInfo?.name}
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
                          {loginOpen.userOption} a Doctor
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
                          {loginOpen.userOption.toLowerCase()} this doctor
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

              {/* report dialogue*/}
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
                    doctor:
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
              {"Dr. " + docInfo?.name}
            </Typography>
          </Hidden>
          <br></br>

          {/* mobile view: thick divider */}
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>

          {/* Doctor basic info */}
          <Box className={classes.profileGrid} mt={3} mb={3}>
            <Typography variant="body1" color="textPrimary">
              <strong>Specialty: </strong> <span>{docInfo?.specialty} </span>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Years of Practice: </strong>{" "}
              <span>{docInfo?.yearsOfPractice + " years"} </span>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Hospital: </strong>
              <span>{docInfo?.hospital}</span>
              {/* private tag */}
              <Chip
                style={{ marginLeft: 10 }}
                color="primary"
                size="small"
                label={docInfo?.type}
              ></Chip>
            </Typography>
            <br></br>

            <Box display="flex" flexDirection="row" mt={1}>
              <LocationOnOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{docInfo?.address}</span>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <PhoneOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{docInfo?.phone}</span>
              </Typography>
            </Box>
          </Box>

          <DocTags
            docInfo={docInfo}
            userInfo={userInfo}
            handleLoginOpen={handleLoginOpen}
          />
        </Grid>

        <Grid item xs={12} sm={1} md={2}>
          {/* desktop view: like button on far right */}
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

DocInfo.propTypes = {
  // like
  changeDocLikeStatus: PropTypes.func.isRequired,
  updateDoctorLikes: PropTypes.func.isRequired,
  // save
  changeDocSaveStatus: PropTypes.func.isRequired,
  // report
  sendReportedDoctors: PropTypes.func.isRequired,
  reportDoctor: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionsToProps = {
  // like
  changeDocLikeStatus,
  updateDoctorLikes,
  // save
  changeDocSaveStatus,
  // report
  reportDoctor,
  sendReportedDoctors,
};

export default connect(mapStateToProps, mapActionsToProps)(DocInfo);
