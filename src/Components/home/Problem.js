import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

//image
import problemImg from "../../img/home/problem.svg";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
    fontSize: 28,
  },

  problemImg: {
    marginLeft: 30,
    marginRight: 30,
    width: "90%",
    height: "90%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      height: "80%",
    },
  },

  problemTitle: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 30,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },

  problemBody: {
    marginRight: 40,
    lineHeight: 2,
    marginLeft: 40,
    color: "rgba(0, 0,0, 0.6)",
  },
}));

// Homepage: Problem
export default function Problem() {
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
          Problem
        </Typography>
        <br></br>
      </Box>
      <Grid container spacing={0} style={{ marginTop: 30 }}>
        <Grid item sm={1} />

        <Grid item xs={12} sm={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={problemImg}
              alt="problemImg"
              className={classes.problemImg}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.problemTitle}
          >
            Information about doctors are{" "}
            <span className={classes.highlightText}>scattered</span> in Malaysia
          </Typography>
          <br></br>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="body1" className={classes.problemBody}>
              The current ways of getting doctor information are mainly through{" "}
              <span className={classes.highlightText}>word-of-mouth</span> or
              searching through individual healthcare institution’s website.
              This creates an{" "}
              <span className={classes.highlightText}>information gap</span>{" "}
              between doctors and patients in Malaysia.
            </Typography>
          </Box>
        </Grid>
        <Grid item sm={1} />
      </Grid>
    </div>
  );
}
