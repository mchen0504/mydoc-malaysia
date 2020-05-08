import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Carousel from "react-elastic-carousel";

//components
import SpecificSpecialtyDocCard from "./SpecificSpecialtyDocCard";

const useStyles = makeStyles((theme) => ({
  divider: {
    height: 2,
    backgroundColor: "#FF8686",
  },

  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },

  navigateIcon: {
    color: "003367",
    fontSize: 60,
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },

  specificSpecialtyDocBox: {
    [theme.breakpoints.up("sm")]: {
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      justifyContent: "left",
      alignItems: "left",
      marginLeft: 20,
    },
  },

  thinLine: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },

  likeBox: {
    display: "flex",
    flexDirection: "row",
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
}));

// for All Gastroenterologists and Insurance Accepted section (used in HospSpecialtyProfile.js under pages folder)
export default function DocInfo() {
  const classes = useStyles();

  // carousel 显示的卡片数量 （eshin added 5/4/20)
  const breakPoints = [{ itemsToShow: 3 }];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          mb={2}
          mt={2}
          className={classes.specificSpecialtyDocBox}
        >
          <Typography variant="h6" color="primary">
            All Gastroenterologists
          </Typography>
          <Divider className={classes.divider} style={{ width: 205 }} />
          <br></br>
          <br></br>
          {/* 这里出现all gastroenterologists doctors 的卡片 (eshin added 5/4/20)*/}
          <Carousel breakPoints={breakPoints}>
            <SpecificSpecialtyDocCard />
            <SpecificSpecialtyDocCard />
            <SpecificSpecialtyDocCard />
            <SpecificSpecialtyDocCard />
            <SpecificSpecialtyDocCard />
            <SpecificSpecialtyDocCard />
          </Carousel>

          <br></br>
        </Box>
        <br></br>
        <Box display="flex" justifyContent="center" alignItems="center" mb={3}>
          Average Satisfactory for Gastroenterology:{" "}
          <FavoriteIcon
            style={{ color: "red", marginLeft: 5, marginRight: 5 }}
          />{" "}
          <span>100</span>
        </Box>

        <hr className={classes.thinLine}></hr>
      </Grid>
      {/* insurance accepted section */}
      <Grid container spacing={0}>
        <Grid item sm={1}></Grid>
        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mb={2}
            ml={2}
            mt={2}
          >
            <Typography variant="h6" color="primary">
              Insurance Accepted
            </Typography>
            <Divider className={classes.divider} style={{ width: 180 }} />
            <Typography variant="body1">
              <p>Asia Assistance Network</p>
              <p>AIA</p>
              <p>AIA - Employee Benefit</p>
              <p>AIA Datalink</p>
              <p>Great Eastern</p>
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={2}></Grid>
        <Grid item xs={12} sm={4}></Grid>
      </Grid>
    </Grid>
  );
}
