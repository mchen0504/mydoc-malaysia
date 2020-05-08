import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Link from "@material-ui/core/Link";
//icons
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

//images
import hospImg from "../../img/results/pantaihospital.png";

//components
import CovidAlert from "../Alert";
import HospTags from "./HospTags";

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
      }
    }
  };

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
                <IconButton>
                  <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                <FavoriteIcon style={{ color: "red" }} />
              )}
              {/* like count */}
              <Typography variant="body2" color="primary">
                {props.targetHos["likes"]}
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
              <Button
                startIcon={<ErrorOutlineOutlinedIcon />}
                style={{ textTransform: "none" }}
                color="primary"
              >
                Report
              </Button>
              {/* share button */}
              <Button
                startIcon={<ShareOutlinedIcon />}
                style={{ textTransform: "none" }}
                color="primary"
              >
                Share
              </Button>
              {/* save button */}
              <Button
                startIcon={<BookmarkBorderOutlinedIcon />}
                style={{ textTransform: "none" }}
                color="primary"
              >
                Save
              </Button>
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
          <HospTags tagInfo={props.targetHos["Tags"]} />
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
                <IconButton>
                  <FavoriteBorderOutlinedIcon style={{ color: "red" }} />
                </IconButton>
              ) : (
                <FavoriteIcon style={{ color: "red" }} />
              )}
              <Typography variant="body2" color="primary">
                {props.targetHos["likes"]}
              </Typography>
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return { authenticated: state.user.authenticated };
}

export default connect(mapStateToProps)(HospInfo);
