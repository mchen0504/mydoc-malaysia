import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import BookmarkIcon from "@material-ui/icons/BookmarkBorderOutlined";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUserOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { changeProfilePic } from "../../redux/actions/userActions";
import { updateDoctorProfilePic } from "../../redux/actions/dataActions";

// const proxyurl = "https://cors-anywhere.herokuapp.com/";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      "& .MuiListItem-root": {
        borderBottom: "10px solid rgba(237, 235, 237, 0.4)",
        backgroundColor: "rgba(255, 255, 255, 100)",
      },
      backgroundColor: "rgba(237, 235, 237, 0.4)",
    },

    [theme.breakpoints.up("md")]: {
      borderRight: "1px solid rgba(237, 235, 237, 1)",
    },
  },

  img: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    objectFit: "contain",
  },

  likeBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  tag: {
    margin: theme.spacing(0.4),
  },

  tagBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
    },
    marginBottom: 20,
  },
}));

//Doctor Account 左边的navigation
function DocSideNav(props) {
  const classes = useStyles();
  const { userInfo, docInfo } = props;
  const [doctorInfo, setDoctorInfo] = useState({
    username: "",
    profilePic: "",
    tags: [],
    likes: 0,
  });

  const indicator = "";

  // initial render: only gets called once
  useEffect(() => {
    if (userInfo) {
      let tags;
      let likes;
      let profileWarning = true;
      let verifyWarning = false;

      // check if all fields of verification have been filled.
      if (userInfo.verification) {
        const verifyHasEmpty = !Object.values(userInfo.verification).some(
          (x) => x !== null && x !== "" && x !== " "
        );
        const notAllFilled = Object.keys(userInfo.verification).length !== 5;
        verifyWarning = verifyHasEmpty || notAllFilled ? true : false;
      }

      // is a doctor and has submitted profile
      if (docInfo) {
        tags = docInfo.tags ? docInfo.tags : "";
        likes = docInfo.likes ? docInfo.likes : 0;
        profileWarning = false;
      }

      setDoctorInfo({
        username: userInfo.username,
        profilePic: userInfo.imgSrc,
        tags,
        likes,
      });

      // set profileShowWarning in account.js
      props.setProfileWarning(profileWarning);
      props.setVerifyWarning(verifyWarning);
    }
  }, [userInfo, docInfo]);

  // reads new image and sets state
  const uploadProfilePicture = (event) => {
    let reader = new FileReader();
    let uploaded = event.target.files[0];
    if (uploaded) {
      reader.readAsDataURL(uploaded);
    }
    reader.onload = () => {
      props.changeProfilePic({ imgSrc: reader.result });
      if (userInfo.specialty) {
        const updateInfo = {
          specialty: userInfo.specialty,
          hospital: userInfo.hospital,
          username: userInfo.username,
          imgSrc: reader.result,
        };
        props.updateDoctorProfilePic(updateInfo);
      }
      setDoctorInfo({
        ...userInfo,
        profilePic: reader.result,
      });
    };
  };

  // create a tag list that contains all tags for this doctor
  let tagList = doctorInfo.tags ? (
    doctorInfo.tags.map((tag) => {
      return (
        <Fragment key={tag.tagName}>
          <li key={tag.tagName}>
            <Chip
              label={tag.tagName + " (" + tag.count + ")"}
              className={classes.tag}
              color="secondary"
              size="small"
            />
          </li>
        </Fragment>
      );
    })
  ) : (
    <p>No review tags yet</p>
  );

  //选list item (profile, saved, like history, acc verification, acc settings)
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  if (!doctorInfo.username) {
    return (
      <div>
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "10%" }}
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div className={classes.root}>
        <List component="nav">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            {/* User profile image */}
            <div className={classes.uploadImg}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-profile-pic"
                multiple
                type="file"
                onChange={uploadProfilePicture}
              />
              <label htmlFor="contained-button-profile-pic">
                <Badge
                  style={{ cursor: "pointer" }}
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={<AddAPhotoIcon />}
                >
                  <Avatar
                    className={classes.img}
                    alt="doctor profile picture"
                    src={doctorInfo.profilePic}
                  />
                </Badge>
              </label>
            </div>

            <Typography variant="h6" color="primary">
              Hi, {userInfo.username}!
            </Typography>

            {userInfo.userType === "doctor" ? (
              <Box className={classes.likeBox} mt={2} mb={2}>
                {/* Likes */}
                <FavoriteIcon style={{ color: "red" }} />
                <Typography variant="body2" color="primary">
                  &nbsp;{doctorInfo.likes}
                </Typography>
              </Box>
            ) : (
              <br></br>
            )}

            {userInfo.userType === "doctor" ? (
              <div className={classes.tagBox}>{tagList}</div>
            ) : (
              <br />
            )}
          </Box>

          {/* Profile */}

          {userInfo.userType === "doctor" ? (
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              component="a"
              href="/profile"
            >
              <ListItemIcon style={{ marginLeft: 20 }}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
              {/* 第一次user要显示这个tooltip */}

              {props.profileShowWarning ? (
                <Tooltip
                  disableFocusListener
                  placement="right"
                  title={
                    <h2 style={{ fontWeight: "normal", lineHeight: 1.5 }}>
                      2. Set up your profile <br></br>
                      <br></br>
                      Add your personal, work, and expertise information.
                    </h2>
                  }
                >
                  <ErrorOutlineOutlinedIcon style={{ color: "red" }} />
                </Tooltip>
              ) : (
                ""
              )}
            </ListItem>
          ) : (
            ""
          )}

          {/* Saved  */}
          <ListItem
            button
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
            component="a"
            href="/saved"
          >
            <ListItemIcon style={{ marginLeft: 20 }}>
              <BookmarkIcon />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </ListItem>

          {/* Like History */}
          <ListItem
            button
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
            component="a"
            href="/likehistory"
          >
            <ListItemIcon style={{ marginLeft: 20 }}>
              <FavoriteOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Like History" />
          </ListItem>

          {/* Account verification */}
          {userInfo.userType === "doctor" ? (
            <ListItem
              button
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              style={{ position: "relative" }}
              component="a"
              href="/accountverification"
            >
              <ListItemIcon style={{ marginLeft: 20 }}>
                <VerifiedUserIcon />
              </ListItemIcon>
              <ListItemText primary="Account Verification" />
              {/* 第一次user要显示这个tooltip */}

              {props.verifyShowWarning ? (
                <Tooltip
                  disableFocusListener
                  placement="right"
                  title={
                    <h2 style={{ fontWeight: "normal", lineHeight: 1.5 }}>
                      Welcome Alex! Before you start: <br></br>
                      <br></br>
                      1. Verify your account <br></br>
                      <br></br>
                      Once you verified your account, you will be able to
                      publish your profile.
                    </h2>
                  }
                >
                  <ErrorOutlineOutlinedIcon style={{ color: "red" }} />
                </Tooltip>
              ) : (
                ""
              )}
            </ListItem>
          ) : (
            ""
          )}
        </List>
      </div>
    </Fragment>
  );
}

DocSideNav.propTypes = {
  changeProfilePic: PropTypes.func.isRequired,
  updateDoctorProfilePic: PropTypes.func.isRequired,
  getDoctorUserSearchInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  storedCredentials: state.user.credentials,
  searchUserInfo: state.data.doctorUserInfo,
});

const mapActionsToProps = {
  changeProfilePic,
  updateDoctorProfilePic,
};

export default connect(mapStateToProps, mapActionsToProps)(DocSideNav);
