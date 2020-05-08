import React, { Fragment } from "react";
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
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Badge from "@material-ui/core/Badge";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

import docImg from "../../img/results/docAlex.png";

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
export default function DocSideNav(props) {
  const classes = useStyles();

  const [profilePic, setProfilePic] = React.useState();

  const uploadProfilePicture = (event) => {
    let reader = new FileReader();
    let uploaded = event.target.files[0];
    if (uploaded) {
      reader.readAsDataURL(uploaded);
    }
    reader.onload = () => {
      setProfilePic(reader.result);
    };
  };

  //选list item (profile, saved, like history, acc verification, acc settings)
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // doctor tags
  const [tags, displayTags] = React.useState([
    { key: 0, label: "Attentive (10)" },
    { key: 1, label: "Bedside manner (10)" },
    { key: 2, label: "Empathetic (10)" },
    { key: 3, label: "Enthusiastic (10)" },
    { key: 4, label: "Friendly (10)" },
    { key: 5, label: "Honest (10)" },
    { key: 6, label: "Knowledgeable (10)" },
    { key: 7, label: "Passionate (10)" },
    { key: 8, label: "Patient (10)" },
    { key: 9, label: "Respectful (10)" },
    { key: 10, label: "Responsible (10)" },
    { key: 11, label: "Trustworthy (10)" },
  ]);

  //tooltip first time user instruction
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

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
                    src={profilePic}
                  />
                </Badge>
              </label>
            </div>

            {/* <div className={classes.uploadImg}>
              <IconButton>
                <Avatar
                  alt="Alex leow"
                  src={docImg}
                  className={classes.img}
                ></Avatar>
              </IconButton>
            </div> */}

            <Typography variant="h6" color="primary">
              Hi, Alex!
            </Typography>

            <Box className={classes.likeBox} mt={2} mb={2}>
              {/* Likes */}
              <FavoriteIcon style={{ color: "red" }} />
              <Typography variant="body2" color="primary">
                100
              </Typography>
            </Box>
            {/* Tags */}
            <div className={classes.tagBox}>
              {tags.map((tag) => {
                return (
                  <li key={tag.key}>
                    <Chip
                      label={tag.label}
                      className={classes.tag}
                      color="secondary"
                      size="small"
                    />
                  </li>
                );
              })}
              {/* 这边需要麻烦你写, 如果没有tag，要显示‘no review tags'， 有tag的话这个就要藏起来 */}
              <p>No review tags yet</p>
            </div>
          </Box>

          {/* 目前写法是点了一个list item, 就跳到属于它的section, */}
          {/* Profile */}
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
          </ListItem>

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

            <Tooltip
              disableFocusListener
              placement="right"
              title={
                <h2 style={{ fontWeight: "normal", lineHeight: 1.5 }}>
                  Welcome Alex! Before you start: <br></br>
                  <br></br>
                  1. Verify your account <br></br>
                  <br></br>
                  Once you verified your account, you will be able to publish
                  your profile.
                </h2>
              }
            >
              <ErrorOutlineOutlinedIcon style={{ color: "red" }} />
            </Tooltip>
          </ListItem>

          {/* Account settings */}
          <ListItem
            button
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
            component="a"
            href="/accountsettings"
          >
            <ListItemIcon style={{ marginLeft: 20 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Account Settings" />
          </ListItem>
        </List>
      </div>
    </Fragment>
  );
}
