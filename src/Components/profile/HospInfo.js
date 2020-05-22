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

//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
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

//images
import hospImg from "../../img/results/pantaihospital.png";

//components
import CovidAlert from "../Alert";
import HospTags from "./HospTags";

import PropTypes from "prop-types";

import { changeHospLikeStatus, changeHospSaveStatus, sendReportedHospitals } from "../../redux/actions/userActions";
import { updateHospitalLikes, reportHospital } from "../../redux/actions/dataActions";


// ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
// ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
// "hospital tags" used in this js is actually referred to the tags attached to a specialty in this hospital
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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

  //hospital image
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
}));

//for hospital image + basic info + likes
//edit tags section is imported from HospTags.js

function HospInfo(props) {
  const classes = useStyles();
  const authenticated = props.authenticated;

  const backToRes = () => {
    if (props.history != null) {
      if (props.backTo == "resultsPage") {
        props.history.push("/results");
      } else if (props.backTo == "profilePage") {
        props.history.push("/hospprofile");
      }else{
        props.history.push("/likehistory");
      }
    }
  };

  const [renderCount, setRenderCount] = React.useState(0);

  const [likeSaveInfo, setState] = React.useState({
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
    oneReason: ""
  });


  // only get called once in the first render
  useEffect(() => {
    // if (renderCount == 0) {
      return displayStoredData();
    // }
  },[]);

  const displayStoredData = () => {
    // call function to get data from returned props from firebase
    getStoredData()
      .then((res) => {
        console.log('hi im here')
        console.log(props.targetHos)
        console.log(res)
        // like
        let listOfLikes;
        let liked = false;

        // if the user has never liked any hospitals
        if (!res[1].likeHistory) {
          listOfLikes = [];
        } else {
          if (res[1].likeHistory.hospitals) {
            listOfLikes = res[1].likeHistory.hospitals;
            // if the user has liked this particular hospital before
            const index = res[1].likeHistory.hospitals.findIndex(hospital => hospital.name.replace(/\s/g,'').toLowerCase() == props.targetHos.name.replace(/\s/g,'').toLowerCase());
            if (index != -1) {
              liked = true;
            }
          } else {
            listOfLikes = [];
          }
        }

        // save
        let listOfSaves;
        let saved = false;

        // if the user has never saved any hospitals
        if (!res[1].saved) {
          listOfSaves = [];
        } else {
          if (res[1].saved.hospitals) {
            listOfSaves = res[1].saved.hospitals;
            // if the user has saved this particular hospital before
            const index = res[1].saved.hospitals.findIndex(hospital => hospital.name.replace(/\s/g,'').toLowerCase() == props.targetHos.name.replace(/\s/g,'').toLowerCase())
            if (index != -1) {
              saved = true;
            }
          } else {
            listOfSaves = [];
          }
        }


        setState({
          hasLiked: liked,
          likedList: listOfLikes,
          numLikes: props.targetHos.likes,

          hasSaved: saved,
          savedList: listOfSaves,

          reportedList: res[1].reportedHospitals ? res[1].reportedHospitals : "",
          numReports: res[0].report ? res[0].report.reportCount : 0,
          reportReasonsList: res[0].report ? res[0].report.reportReasons : "",
          oneReason: ""
        });
        console.log('likeSaveInfo');
        console.log(likeSaveInfo);

        // setRenderCount(1);
      }).catch((error) => {
        console.error(error);
      })
  }

  // wait for returned props from firebase to be ready
  let getStoredData = async () => {
    let [storedSearchInfo, userStoredCredentials] =
      await Promise.all([props.searchInfo, props.storedCredentials]);
    return [storedSearchInfo, userStoredCredentials];
  }


  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~LIKE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the like button is pressed
  const toggleLikeUnlike = () => {
    // the user has liked this hospital before
    if (likeSaveInfo.hasLiked) {
      let likedListCopy = likeSaveInfo.likedList;
      let index = likedListCopy.findIndex(hospital => hospital.name == props.targetHos.name);
      // remove this hospital from the user like list
      likedListCopy.splice(index, 1);
      setState(prevState => {
        prevState.numLikes = prevState.numLikes - 1;
        prevState.hasLiked = false;
        prevState.likedList = likedListCopy;
        return ({
          ...prevState
        })
      })
    } else {
      console.log(props.targetHos);
      const newHospInfo = {
        name: props.targetHos.name,
        address: props.targetHos.address,
        likes: likeSaveInfo.numLikes,
        phone: props.targetHos.phone,
        relatedSpecialty: props.targetHos.relatedSpecialty,
        type: props.targetHos.type
      };

      likeSaveInfo.likedList.push(newHospInfo);
      console.log(likeSaveInfo);
      setState(
        // add to the list if the list contains other doctors, otherwise use this doctor to start a list
        (prevState) => {
          prevState.numLikes = prevState.numLikes + 1;
          prevState.hasLiked = true;
          return ({
            ...prevState
          })
        }
      )
    }
    toggleLike();
  }

  const toggleLike = () => {
    waitLikeUpdate()
      .then((res) => {
        console.log(likeSaveInfo.likedList);
        props.changeHospLikeStatus(likeSaveInfo.likedList);
        const updateInfo = {
          specialty: props.targetHos.relatedSpecialty,
          hospital: props.targetHos.HospitalName.replace(/\s/g,''),
          likes: res[1]
        }
        props.updateHospitalLikes(updateInfo);
        updateLocalDocList(updateInfo);
      }).catch((error) => {
        console.error(error);
      });
  }

  let waitLikeUpdate = async () => {
    let [likedList, likes] =
      await Promise.all([likeSaveInfo.likedList, likeSaveInfo.numLikes]);
    return [likedList, likes];
  }

  const updateLocalDocList = (updateInfo)=>{
    // set location target list location
    console.log('local list');
    let newHosList = [];
    for (let hos in props.hospitalInfo){
      let hosItem = props.hospitalInfo[hos];
      console.log('hosItem')
      console.log(hosItem)
      if (hosItem.name == props.targetHos.name){
        hosItem.NumberOfLikes = likeSaveInfo.numLikes;
        hosItem.likes = likeSaveInfo.numLikes;
      }
      newHosList.push(hosItem);
    }
    console.log(newHosList);
    props.sethospitalInfo(newHosList);

    // set database
    let newDatabase;
    newDatabase = props.database;
    let hospitalId = updateInfo['hospital'].replace(/\s/g,'')
    newDatabase[updateInfo['specialty']]['hospitals'][hospitalId]['likes'] = likeSaveInfo.numLikes;
    newDatabase[updateInfo['specialty']]['hospitals'][hospitalId]['NumberOfLikes'] = likeSaveInfo.numLikes;
    console.log('new database')
    console.log(newDatabase[updateInfo['specialty']]['hospitals'][hospitalId]);
    props.setDatabase(newDatabase);
  }

  // if the user has liked this hospital before: filled heart, otherwise outlined heart
  const LikeIcon = (likeSaveInfo.hasLiked) ? FavoriteIcon : FavoriteBorderOutlinedIcon;



  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SAVE FUNCTIONALITY~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // when the save button is pressed
  const toggleSaveUnsave = () => {
    // the user has saved this hospital before
    if (likeSaveInfo.hasSaved) {
      let savedListCopy = likeSaveInfo.savedList;
      let index = savedListCopy.findIndex(hospital => hospital.name == props.targetHos.name);
      // remove this hospital from the user saved list
      savedListCopy.splice(index, 1);

      setState({
        ...likeSaveInfo,
        savedList: savedListCopy,
        hasSaved: false,
      })
    } else {
      // the newly saved hospital's information to be added to the user's saved hospital list
      const newHospInfo = {
        name: props.targetHos.name.replace(/\s/g,''),
        address: props.targetHos.address,
        likes: likeSaveInfo.numLikes,
        phone: props.targetHos.phone,
        relatedSpecialty: props.targetHos.relateSpecialty,
        type: props.targetHos.type
      };
      likeSaveInfo.savedList.push(newHospInfo);
      setState(
        // add to the list if the list contains other doctors, otherwise use this doctor to start a list
        (prevState) => {
          prevState.hasSaved = true;
          return ({
            ...prevState
          })
        }
      )
    }
    toggleSave();
  }

  // triggered if the save button is pressed (which sets state)
  // useEffect(() => {
  //   if (renderCount == 1) {
  //     return toggleSave();
  //   }
  // }, [likeSaveInfo.hasSaved, likeSaveInfo.savedList]);


  const toggleSave = () => {
    waitSaveUpdate()
      .then((res) => {
        props.changeHospSaveStatus(res);
      }).catch((error) => {
        console.error(error);
      });
  }

  let waitSaveUpdate = async () => {
    let savedList = await likeSaveInfo.savedList;
    return savedList;
  }


  // if the user has saved this doctor before: filled bookmark, otherwise outlined bookmark
  const SaveIcon = (likeSaveInfo.hasSaved) ? BookmarkIcon : BookmarkBorderOutlinedIcon;



  // -------------------------------------------------------------------- //
    // ----------------------------Report---------------------------------------- //
  // 新加 5/14
  //report弹窗：填的表
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


  const reported = likeSaveInfo.reportedList.includes(props.targetHos.name);

  // send hospital report to database
  const submitReport = () => {
    const oneReason = likeSaveInfo.oneReason;
    const reasons = likeSaveInfo.reportReasonsList;
    reasons.push(oneReason);
    const reportedList = likeSaveInfo.reportedList;
    if (!reported) {
      reportedList.push(props.targetHos.name);
    }

    // send to specialty doctor account
    const oneReport = {
      reportCount: likeSaveInfo.numReports + 1,
      reportReasons: reasons,

      // *******hard code 
      specialty: props.targetHos.relatedSpecialty,
      hospital: props.targetHos.name,
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
      reportedList: [prevState.reportedList,props.targetHos.name],
    }));
  };





  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ~~~~~~~~~~~sign up or login in if want to save or report~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // 弹窗去signin/signup如果要report没有login
  const [loginOpen, setLoginOpen] = React.useState({
    open: false,
    // keep track of what function the user selects (report, like, save, tag)
    userOption: "",
  });

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };


  // for login in diagolue: render correponding icon for user option: recommend, like, save
  let Icon = FavoriteIcon;

  if (loginOpen.userOption == "Recommend") {
    Icon = FavoriteIcon;
  } else if (loginOpen.userOption == "Save") {
    Icon = BookmarkBorderOutlinedIcon;
  } else if (loginOpen.userOption == "Report") {
    Icon = ErrorOutlineOutlinedIcon;
  } else {
    Icon = EditOutlinedIcon;
  }

//   const signUpInDialogue = (option) => {
//     const optionFirstUpper = option[0].toUpperCase() + option.slice(1);

//     return (

//       <Dialog
//         fullWidth="true"
//         maxWidth="sm"
//         open={loginOpen}
//         onClose={handleLoginClose}
//       >
//         <Box display="flex" alignItems="center">
//           <Box flexGrow={1}>
//             <DialogTitle>{optionFirstUpper} a Doctor</DialogTitle>
//           </Box>
//           <Box>
//             <DialogActions>
//               <IconButton
//                 size="small"
//                 onClick={handleLoginClose}
//                 color="primary"
//               >
//                 <CloseIcon />
//               </IconButton>
//             </DialogActions>
//           </Box>
//         </Box>
//         <DialogContent>
//           <Box
//             display="flex"
//             flexDirection="column"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <ErrorOutlineOutlinedIcon />
//             <br></br>
//             <Typography variant="body1" align="center">
//               You need to sign in to {option} this doctor
//                         </Typography>
//           </Box>
//           <Box display="flex" mt={2} mb={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ textTransform: "none" }}
//               fullWidth
//               component={Link}
//               to="/login"
//             >
//               Log in
//                         </Button>
//           </Box>

//           <Box display="flex" mb={2}>
//             <Button
//               variant="outlined"
//               color="primary"
//               style={{ textTransform: "none" }}
//               fullWidth
//               component={Link}
//               to="/signup"
//             >
//               Sign up
//                         </Button>
//           </Box>
//         </DialogContent>
//       </Dialog>
//     )
//   }












  return (
    <div>
      <div className={classes.covidBox}>
        <CovidAlert />
      </div>

      {/* For 'return to hospitals' button (需要换成return to doctors， depending on user之前是怎么搜的) */}
      <Box display="flex" mt={3} mb={3} className={classes.returnBox}>
        <Button
          style={{ fontSize: 16, textTransform: "none" }}
          color="primary"
          startIcon={<ArrowBackIosIcon />}
          onClick={backToRes}
        >
          Return to Hospitals
        </Button>
      </Box>

      {/* 手机屏幕才会出现的格式：hospital照片在上面 ，like icon 在右上角*/}
      <Hidden smUp>
        <Grid container display="flex" justifyContent="center">
          <Grid item xs={3}></Grid>
          <Grid item xs={6} align="center">
            {/* hospital image */}
            <div style={{ width: 150, height: 180 }}>
              <img className={classes.img} src={hospImg} alt="hospimg" />
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

                )}                )}
              {/* like count */}
              <Typography variant="body2" color="primary">
                {likeSaveInfo.numLikes.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
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
            {/* 大屏幕会出现的格式：hospital照片在左边 */}
            <Hidden xsDown>
              {/* hospital image */}
              <div style={{ width: 200, height: 250 }}>
                <img className={classes.img} src={hospImg} alt="hospimg" />
              </div>
            </Hidden>

            {/* 手机屏幕出现的格式：hospital name 在照片下面 */}
            <Hidden smUp>
              <Typography variant="h5" color="primary" style={{ margin: 20 }}>
                {props.targetHos["HospitalName"]}
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
                      <DialogTitle>{loginOpen.userOption} a Hospital</DialogTitle>
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
                        You need to sign in to {loginOpen.userOption.toLowerCase()} this hospital
                                        </Typography>
                    </Box>
                    <Box display="flex" mt={2} mb={2}>
                      <Button
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
                  // michelle 5/16: 这里的fragment和里面的东西都替换掉原来的
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
          {/* 大屏幕会出现的格式：hospital name 在右边 */}
          <Hidden xsDown>
            <Typography variant="h5" color="primary">
              {props.targetHos["HospitalName"]}
              {/* private tag */}
              <Chip
                style={{ marginLeft: 10 }}
                color="primary"
                size="small"
                label="Private"
              ></Chip>
            </Typography>
          </Hidden>

          {/* 手机幕会出现的格式：灰色比较粗的divider line */}
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>

          {/* hospital basic info */}
          <Box className={classes.profileGrid} mt={3} mb={3}>
            <Typography variant="body1" color="textPrimary">
              <strong>Official website: </strong>{" "}
              <Link href="https://www.pantai.com.my/kuala-lumpur">Link</Link>
            </Typography>

            <Typography variant="body1" color="textPrimary">
              <strong>Hours: </strong>{" "}
              <span>Open {props.targetHos["Hours"]}</span>
            </Typography>

            <Hidden smUp>
              <Typography variant="body1" color="textPrimary">
                <strong>Hospital Type: </strong> {/* private tag */}
                <Chip
                  style={{ marginLeft: 10 }}
                  color="primary"
                  size="small"
                  label={props.targetHos["HospitalType"]}
                ></Chip>
              </Typography>
            </Hidden>

            <br></br>

            <Box display="flex" flexDirection="row" mt={1}>
              <LocationOnOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{props.targetHos["Address"]}</span>
              </Typography>
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <PhoneOutlinedIcon style={{ marginRight: 10 }} />
              <Typography variant="body1" color="textPrimary">
                <span>{props.targetHos["Phone"]}</span>
              </Typography>
            </Box>
          </Box>
          {/* edit Tag component (imported from HospTag.js) */}
          <HospTags tagInfo={props.targetHos["tags"]} handleLoginOpen={handleLoginOpen}/>
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
                {likeSaveInfo.numLikes.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
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
  reportHospital: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  storedCredentials: state.user.credentials,
  searchInfo: state.data.searchInfoHospital
});

const mapActionsToProps = {
  changeHospLikeStatus,
  updateHospitalLikes,

  changeHospSaveStatus,

  sendReportedHospitals,
  reportHospital
};

export default connect(mapStateToProps, mapActionsToProps)(HospInfo);