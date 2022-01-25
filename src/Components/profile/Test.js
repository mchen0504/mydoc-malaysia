import React, { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import axios from "axios";

//icons
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
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

import {
  changeDocLikeStatus,
  changeDocSaveStatus,
  sendReportedDoctors,
} from "../../redux/actions/userActions";
import { updateDoctorLikes, report } from "../../redux/actions/dataActions";

//components
import CovidAlert from "../Alert";
// import DocTags from "./DocTags";
import DocTags from "./DocTagsTest";

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

function Test(props) {
  const classes = useStyles();
  const { docInfo, userInfo } = props;

  if (props.backTo === null) {
    props.history.push("/");
    window.location.reload();
  }

  const backToRes = () => {
    if (props.history !== null) {
      if (props.backTo === "resultsPage") {
        props.history.push("/results");
      } else if (props.backTo === "hospprofile") {
        let specialty = docInfo.specialty.replace(" & ", "-");
        let hospital = docInfo.hospital.replace(/\s+/g, "-");
        props.history.push(`/profile/${hospital}/${specialty}`);
      } else if (props.backTo === "likeHistory") {
        props.history.push("/likehistory");
      } else {
        props.history.push("/saved");
      }
    }
  };

  const authenticated = props.authenticated;

  const [likeSaveInfo, setState] = React.useState({
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
          doctor.username.replace(/\s/g, "").toLowerCase() ===
          docInfo.username.replace(/\s/g, "").toLowerCase()
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
  }, [docInfo, userInfo]);

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
    updateLocalDocList(newLikes);
  };

  const toggleLike = (updateInfo, likedList) => {
    axios
      .post("/updatelikeddoctors", likedList)
      .then(() => {
        props.updateDoctorLikes(updateInfo);
      })
      .catch((error) => console.error(error));
  };

  const updateLocalDocList = (newLikes) => {
    let newDocList = [];
    for (let doc in docInfo) {
      let docItem = docInfo[doc];
      if (docItem.DocName === docInfo.name) {
        docItem.NumberOfLikes = newLikes;
        docItem.likes = newLikes;
      }
      newDocList.push(docItem);
    }
    props.setDocInfo(newDocList);

    // set database
    let newDatabase = props.database;
    let hospitalId = docInfo.hospital.replace(/\s/g, "");
    let docID = docInfo.username.replace(/\s/g, "");

    newDatabase[docInfo.specialty].hospitals[hospitalId].doctors[docID].likes =
      newLikes;
    newDatabase[docInfo.specialty].hospitals[hospitalId].doctors[
      docID
    ].NumberOfLikes = newLikes;
    props.setDatabase(newDatabase);
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

  // if the user has saved this doctor before: filled bookmark, otherwise outlined bookmark
  const SaveIcon = likeSaveInfo.hasSaved
    ? BookmarkIcon
    : BookmarkBorderOutlinedIcon;

  // -------------------------------------------------------------------- //
  // ----------------------------Report---------------------------------------- //
  // 新加 5/14
  //report弹窗：填的表
  const [reportOpen, setReportOpen] = React.useState(false);
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

    // send to specialty doctor account
    const oneReport = {
      reportCount: likeSaveInfo.numReports + 1,
      reportReasons: reasons,

      specialty: docInfo.specialty,
      hospital: docInfo.hospital,
      username: docInfo.username,
    };
    props.report(oneReport);

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

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~ign up or login in if want to save or report~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // 弹窗去signin/signup如果要report没有login
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

  // He Chen
  let returnPageDesc;
  if (props.backTo === "resultsPage") {
    returnPageDesc = "Result Page";
  } else if (props.backTo === "hospprofile") {
    returnPageDesc = "Hospital Profile";
  } else if (props.backTo === "likeHistory") {
    returnPageDesc = "Like History";
  } else {
    returnPageDesc = "Saved";
  }

  return (
    <div>
      <div className={classes.covidBox}>
        <CovidAlert />
      </div>

      {/* For 'return to doctors' button (需要换成return to hospital， depending on user之前是怎么搜的) */}
      <Box display="flex" mt={3} mb={3} className={classes.returnBox}>
        <Button
          style={{ fontSize: 16, textTransform: "none" }}
          color="primary"
          onClick={backToRes}
          startIcon={<ArrowBackIosIcon />}
        >
          Return to {returnPageDesc}
        </Button>
      </Box>

      {/* 手机屏幕才会出现的格式：doctor照片在上面 ，like icon 在右上角*/}
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
              {/* 如果登入了，爱心icon成了iconButton，可以点 , 但是我没写logic, 目前点了的话，这个button不会从
                <FavoriteBorderOutlinedIcon> 换成<FavoriteIcon>, likeCount也不会增加，麻烦你了
                */}
              {authenticated ? (
                <IconButton onClick={toggleLikeUnlike}>
                  <LikeIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                // michelle 5/16: 这里的fragment和里面的东西都替换掉原来的
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
            {/* 大屏幕会出现的格式：doctor照片在左边 */}
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

            {/* 手机屏幕出现的格式：doctor's name 在照片下面 */}
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
                // michelle 5/16: 这里的fragment和里面的东西都替换掉原来的 （这里新的东西比原来长很多 麻烦小心对一下位置）
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

              {/* report dialogue 新加的 5/10/2020 */}
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
          {/* 大屏幕会出现的格式：doctor name 在右边 */}
          <Hidden xsDown>
            <Typography variant="h5" color="primary">
              {"Dr. " + docInfo?.name}
            </Typography>
          </Hidden>
          <br></br>

          {/* 手机幕会出现的格式：灰色比较粗的divider line */}
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
            // tagInfo={docInfo?.tags}
            docInfo={docInfo}
            userInfo={userInfo}
            handleLoginOpen={handleLoginOpen}
          />
        </Grid>

        <Grid item xs={12} sm={1} md={2}>
          {/* 大屏幕会出现的格式：like icon在最右边 */}
          <Hidden xsDown>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* 如果登入了，爱心icon成了iconButton，可以点 , 但是我没写logic, 目前点了的话，这个button不会从
                <FavoriteBorderOutlinedIcon> 换成<FavoriteIcon>, likeCount也不会增加，麻烦你了
                */}
              {authenticated ? (
                <IconButton onClick={toggleLikeUnlike}>
                  <LikeIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                // michelle 5/16: 这里的fragment和里面的东西都替换掉原来的
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

Test.propTypes = {
  // like
  changeDocLikeStatus: PropTypes.func.isRequired,
  updateDoctorLikes: PropTypes.func.isRequired,

  // save
  changeDocSaveStatus: PropTypes.func.isRequired,

  // report
  sendReportedDoctors: PropTypes.func.isRequired,
  report: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  storedCredentials: state.user.credentials,
  searchInfo: state.data.searchInfo,
});

const mapActionsToProps = {
  // like
  changeDocLikeStatus,
  updateDoctorLikes,

  // save
  changeDocSaveStatus,

  // report
  sendReportedDoctors,
  report,
};

export default connect(mapStateToProps, mapActionsToProps)(Test);
