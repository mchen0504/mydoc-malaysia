import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";

//images
import solution1 from "../../img/home/solution1.png";
import solution2 from "../../img/home/solution2.png";
import solution3 from "../../img/home/solution3.png";
import linearrowLeft from "../../img/home/linearrow1.png";
import linearrowRight from "../../img/home/linearrow_2.png";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
    fontSize: 28,
  },

  solutionImg: {
    marginLeft: 20,
    marginRight: 20,
    width: "20%",
    height: "20%",
  },

  solutionBody: {
    marginRight: 60,
    lineHeight: 2,
    marginLeft: 60,
    color: "rgba(0, 0,0, 0.6)",
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      marginRight: 40,
      marginLeft: 30,
    },
  },

  lineArrowLeft: {
    width: "20%",
    height: "20%",
    [theme.breakpoints.down("xs")]: {
      transform: "rotate(90deg)",
    },
  },

  lineArrowRight: {
    width: "35%",
    height: "35%",
  },
}));

// Homepage: Solution
export default function Solution() {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 120 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Divider className={classes.divider} />
        <br></br>
        <Typography color="primary" align="center" className={classes.heading}>
          Solution
        </Typography>
        <br></br>
      </Box>
      <Grid container spacing={0} style={{ marginTop: 30 }}>
        <Grid item xs={12} sm={4}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={solution1}
              alt="solution1"
              className={classes.solutionImg}
            />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.solutionBody}
            >
              Users discover doctors by specialty, condition, and location
            </Typography>
          </Box>
        </Grid>
        <Hidden xsDown>
          <Box position="absolute" zIndex="modal" left="28%">
            <img
              src={linearrowLeft}
              alt="linearrowLeft"
              className={classes.lineArrowLeft}
            />
          </Box>
        </Hidden>

        <Grid item xs={12} sm={4}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <img
              src={solution2}
              alt="solution2"
              className={classes.solutionImg}
            />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.solutionBody}
            >
              We gather all doctor information in one place and show you
              people’s recommended doctors
            </Typography>
          </Box>
        </Grid>
        <Hidden xsDown>
          <Box position="absolute" zIndex="tooltip" left="56%">
            <img
              src={linearrowRight}
              alt="linearrowRight"
              className={classes.lineArrowRight}
            />
          </Box>
        </Hidden>

        <Grid item xs={12} sm={4}>
          <br></br>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <img
              src={solution3}
              alt="solution3"
              className={classes.solutionImg}
            />

            <br></br>

            <Typography
              variant="body1"
              align="center"
              className={classes.solutionBody}
            >
              Doctors present their services online and engage new patients
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
