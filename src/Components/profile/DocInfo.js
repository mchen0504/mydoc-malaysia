import React, { Fragment, useEffect } from "react";
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

  if (props.backTo === null) {
    props.history.push("/");
    window.location.reload();
  }

  const backToRes = () => {
    // likeHistory
    if (props.history !== null) {
      if (props.backTo === "resultsPage") {
        props.history.push("/results");
      } else if (props.backTo === "hospprofile") {
        props.history.push("/hospprofile");
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

  // only get called once in the first render
  useEffect(() => {
    displayStoredData();
  }, []);

  const displayStoredData = () => {
    getStoredData()
      .then((res) => {
        // like
        let listOfLikes;
        let liked = false;
        // if the user has never liked any doctors
        if (!res.likeHistory) {
          listOfLikes = [];
        } else {
          if (res.likeHistory.doctors) {
            listOfLikes = res.likeHistory.doctors;
            // if the user has liked this particular doctor before
            const index = res.likeHistory.doctors.findIndex(
              (doctor) =>
                doctor.username.replace(/\s/g, "").toLowerCase() ===
                props.targetDoc.userName.replace(/\s/g, "").toLowerCase()
            );
            if (index !== -1) {
              liked = true;
            }
          } else {
            listOfLikes = [];
          }
        }

        // save
        let listOfSaves;
        let saved = false;

        // if the user has never saved any doctors
        if (!res.saved) {
          listOfSaves = [];
        } else {
          if (res.saved.doctors) {
            listOfSaves = res.saved.doctors;
            // if the user has saved this particular doctor before
            const index = res.saved.doctors.findIndex(
              (doctor) =>
                doctor.username.replace(/\s/g, "").toLowerCase() ===
                props.targetDoc.userName.replace(/\s/g, "").toLowerCase()
            );
            if (index !== -1) {
              saved = true;
            }
          } else {
            listOfSaves = [];
          }
        }
        setState({
          username: res.username,
          hasLiked: liked,
          likedList: listOfLikes,
          numLikes:
            props.targetDoc.NumberOfLikes || props.targetDoc.likes
              ? props.targetDoc.NumberOfLikes || props.targetDoc.likes
              : 0,

          hasSaved: saved,
          savedList: listOfSaves,

          reportedList: res.reportedDoctors ? res.reportedDoctors : [],
          numReports: props.targetDoc.report
            ? props.targetDoc.report.reportCount
            : 0,
          reportReasonsList: props.targetDoc.report
            ? props.targetDoc.report.reportReasons
            : [],

          oneReason: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // wait for returned props from firebase to be ready
  let getStoredData = async () => {
    let storedCredentials = await props.storedCredentials;
    return storedCredentials;
  };

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LIKE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the like button is pressed
  const toggleLikeUnlike = () => {
    // the user has liked this doctor before
    if (likeSaveInfo.hasLiked) {
      let likedListCopy = likeSaveInfo.likedList;
      let index = likedListCopy.findIndex(
        (doctor) => doctor.username === props.targetDoc.userName
      );
      // remove this doctor from the user like list
      likedListCopy.splice(index, 1);
      setState((prevState) => {
        prevState.numLikes = prevState.numLikes - 1;
        prevState.hasLiked = false;
        prevState.likedList = likedListCopy;
        return {
          ...prevState,
        };
      });
    } else {
      // the newly liked doctor's information to be added to the user's liked doctor list
      let newDocInfo = {
        hospital: props.targetDoc.Hospital,
        specialty: props.targetDoc.specialty,
        username: props.targetDoc.userName,
      };

      likeSaveInfo.likedList.push(newDocInfo);

      setState(
        // add to the list if the list contains other doctors, otherwise use this doctor to start a list
        (prevState) => {
          prevState.numLikes = prevState.numLikes + 1;
          prevState.hasLiked = true;
          return {
            ...prevState,
          };
        }
      );
    }

    let updateInfo = {
      specialty: props.targetDoc.specialty,
      hospital: props.targetDoc.hospital,
      username: props.targetDoc.userName,
      likes: likeSaveInfo.numLikes,
    };
    toggleLike(likeSaveInfo.likedList, updateInfo);
    updateLocalDocList(updateInfo);
  };

  const toggleLike = (targetList, numberOfLikeInfoParam) => {
    // let url =
    //   "https://us-central1-mydoc-f3cd9.cloudfunctions.net/apiForSearch/postLikeInfo";
    // let proxyurl = "https://cors-anywhere.herokuapp.com/";
    // let params = {
    //   userName: likeSaveInfo.username,
    //   likedList: targetList,
    // };
    axios
      .post("/updatelikeddoctors", likeSaveInfo.likedList)
      .then(() => {
        props.updateDoctorLikes(numberOfLikeInfoParam);
      })
      .catch((error) => console.log(error));
  };

  const updateLocalDocList = (updateInfo) => {
    // set location target list location
    let newDocList = [];
    for (let doc in props.docInfo) {
      let docItem = props.docInfo[doc];
      if (docItem.DocName === props.targetDoc.DocName) {
        docItem.NumberOfLikes = likeSaveInfo.numLikes;
        docItem.likes = likeSaveInfo.numLikes;
      }
      newDocList.push(docItem);
    }
    props.setDocInfo(newDocList);

    // set database
    let newDatabase;
    newDatabase = props.database;
    let hospitalId = updateInfo["hospital"].replace(/\s/g, "");
    let docID = updateInfo["username"].replace(/\s/g, "");
    newDatabase[updateInfo["specialty"]]["hospitals"][hospitalId]["doctors"][
      docID
    ]["likes"] = likeSaveInfo.numLikes;
    newDatabase[updateInfo["specialty"]]["hospitals"][hospitalId]["doctors"][
      docID
    ]["NumberOfLikes"] = likeSaveInfo.numLikes;
    props.setDatabase(newDatabase);
  };

  // if the user has liked this doctor before: filled heart, otherwise outlined heart
  const LikeIcon = likeSaveInfo.hasLiked
    ? FavoriteIcon
    : FavoriteBorderOutlinedIcon;

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SAVE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the save button is pressed
  const toggleSaveUnsave = () => {
    // the user has saved this doctor before
    if (likeSaveInfo.hasSaved) {
      let savedListCopy = likeSaveInfo.savedList;
      let index = savedListCopy.findIndex(
        (doctor) => doctor.username === props.targetDoc.userName
      );
      // remove this doctor from the user saved list
      savedListCopy.splice(index, 1);

      setState({
        ...likeSaveInfo,
        savedList: savedListCopy,
        hasSaved: false,
      });
    } else {
      // the newly saved doctor's information to be added to the user's saved doctor list
      let newDocInfo = {
        hospital: props.targetDoc.Hospital,
        languages: props.targetDoc.languages,
        likes: likeSaveInfo.numLikes,
        name: props.targetDoc.DocName,
        specialty: props.targetDoc.specialty,
        type: props.targetDoc.type,
        username: props.targetDoc.userName,
      };
      likeSaveInfo.savedList.push(newDocInfo);

      setState(
        // add to the list if the list contains other doctors, otherwise use this doctor to start a list
        (prevState) => {
          prevState.hasSaved = true;
          return {
            ...prevState,
          };
        }
      );
    }
    updateUserSave();
  };

  const updateUserSave = async () => {
    try {
      let savedList = await likeSaveInfo.savedList;
      props.changeDocSaveStatus(savedList);
    } catch (err) {
      console.error(err);
    }
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

  const reported = likeSaveInfo.reportedList.includes(props.targetDoc.userName);
  // reportedList
  // send report to database
  const submitReport = () => {
    const oneReason = likeSaveInfo.oneReason;
    const reasons = likeSaveInfo.reportReasonsList;
    reasons.push(oneReason);
    let reportedList = likeSaveInfo.reportedList;
    if (!reported) {
      reportedList.push(props.targetDoc.userName);
    }

    // send to specialty doctor account
    const oneReport = {
      reportCount: likeSaveInfo.numReports + 1,
      reportReasons: reasons,

      // *******hard code
      specialty: props.targetDoc.specialty,
      hospital: props.targetDoc.Hospital,
      username: props.targetDoc.userName,
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
      reportedList: [prevState.reportedList, props.targetDoc.userName],
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
              <img
                className={classes.img}
                src={props.targetDoc["imgSrc"]}
                alt="docimg"
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
                  src={props.targetDoc.imgSrc}
                  alt="docimg"
                />
              </div>
            </Hidden>

            {/* 手机屏幕出现的格式：doctor's name 在照片下面 */}
            <Hidden smUp>
              <Typography variant="h5" color="primary" style={{ margin: 20 }}>
                {"Dr. " + props.targetDoc.name}
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
              {"Dr. " + props.targetDoc.name}
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
              <strong>Specialty: </strong>{" "}
              <span>{props.targetDoc.specialty} </span>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Years of Practice: </strong>{" "}
              <span>{props.targetDoc.yearsOfPractice + " years"} </span>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Hospital: </strong>
              <span>{props.targetDoc.hospital}</span>
              {/* private tag */}
              <Chip
                style={{ marginLeft: 10 }}
                color="primary"
                size="small"
                label={props.targetDoc.type}
              ></Chip>
            </Typography>
            <br></br>

            <Box display="flex" flexDirection="row" mt={1}>
              <LocationOnOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{props.targetDoc.address}</span>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <PhoneOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{props.targetDoc.phone}</span>
              </Typography>
            </Box>
          </Box>

          <DocTags
            tagInfo={props.targetDoc.tags}
            targetDoc={props.targetDoc}
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

DocInfo.propTypes = {
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

export default connect(mapStateToProps, mapActionsToProps)(DocInfo);
