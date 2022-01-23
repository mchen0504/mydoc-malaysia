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
import Carousel from "react-elastic-carousel";

//components
import TopRatedDocCard from "./TopRatedDocCard";
import TopRatedDocCardTest from "./TopRatedDocCardTest";

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

  topRatedDocBox: {
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
}));

// for Top Rated Doctors, Top Rated Specialty, Insurance Accepted section (used in HospProfile.js under pages folder)
export default function DocInfoTest(props) {
  const classes = useStyles();
  const { hospInfo } = props;

  // carousel 显示的卡片数量 （eshin added 5/4/20)
  const breakPoints = [{ itemsToShow: 3 }];

  // created 5/11
  let doctors = hospInfo?.doctors;
  let conditionList = [];
  let doctorSortList = [];
  for (let username in doctors) {
    let targetDoc = doctors[username];
    targetDoc.username = username;
    // if the doctor has published their profile and they are still in this specialty
    if (targetDoc.publish && !targetDoc.deleted) {
      targetDoc.conditions = targetDoc.conditions.map((item) => {
        let newItem = item.toLowerCase();
        newItem = newItem.replace(newItem[0], newItem[0].toUpperCase());
        return newItem;
      });
      targetDoc.conditions.forEach((condition) => {
        if (conditionList.indexOf(condition) === -1) {
          conditionList.push(condition);
        }
      });
      doctorSortList.push(targetDoc);
    }
  }
  doctorSortList.sort((a, b) => {
    return b.likes - a.likes;
  });
  let doctorCards = [];
  doctorSortList.forEach((doc, index) => {
    // let card = <TopRatedDocCard {...props} docInfo={doc} key={index} />;
    let card = <TopRatedDocCardTest {...props} docInfo={doc} key={index} />;
    doctorCards.push(card);
  });

  // create procedure List
  let conditionsDesc = conditionList.map((singleCondition) => {
    let conditionInfo = <p key={singleCondition}>{singleCondition}</p>;
    return conditionInfo;
  });

  // create condition List
  let insuranceList = hospInfo?.insurance.map((insurance) => {
    let insuranceCards = <p key={insurance}>{insurance}</p>;
    return insuranceCards;
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          mb={2}
          mt={2}
          className={classes.topRatedDocBox}
        >
          <Typography variant="h6" color="primary">
            Top Rated Doctors
          </Typography>
          <Divider className={classes.divider} style={{ width: 170 }} />
          <br></br>
          <br></br>
          {doctorCards.length !== 0 ? (
            <Carousel breakPoints={breakPoints}>{doctorCards}</Carousel>
          ) : (
            ""
          )}
        </Box>
        <br></br>
        <hr className={classes.thinLine}></hr>
      </Grid>

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
            {/* top rated specialties */}
            <Typography variant="h6" color="primary">
              Conditions
            </Typography>
            <Divider className={classes.divider} style={{ width: 100 }} />
            <Typography variant="body1">{conditionsDesc}</Typography>
          </Box>
          <Hidden smUp>
            <hr className={classes.line}></hr>
          </Hidden>
        </Grid>
        <Grid item sm={2}></Grid>
        {/* insurance accepted */}
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
            <Typography variant="body1">{insuranceList}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
