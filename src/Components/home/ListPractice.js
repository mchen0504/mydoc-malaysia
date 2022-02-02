import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import doctorsImg from "../../img/home/doctors.png";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  heading: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 24,
    },
    fontSize: 28,
  },

  doctorsImg: {
    marginLeft: 20,
    marginRight: 20,
    width: "80%",
    height: "80%",
    borderRadius: 12,
  },

  listPracticeTitle: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 20,
      marginLeft: 40,
    },
  },

  listPracticeBody: {
    lineHeight: 2,
    color: "rgba(0, 0, 0, 0.6)",
    marginRight: 20,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 40,
      marginRight: 30,
    },
  },

  signupButton: {
    textTransform: "none",
    marginTop: 20,
    width: 150,
    height: 40,
    marginBottom: 40,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 40,
    },
  },
}));

// Homepage: List your practice for doctors to sign up
export default function ListPractice() {
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
          List Your Practice
        </Typography>
        <br></br>
      </Box>
      <Grid container spacing={0} style={{ marginTop: 30 }}>
        <Grid item sm={1} />

        <Grid item xs={12} sm={5} style={{ marginLeft: 10, marginRight: 10 }}>
          <Typography
            variant="h5"
            color="primary"
            className={classes.listPracticeTitle}
          >
            Are you a doctor?
          </Typography>
          <br></br>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="body1" className={classes.listPracticeBody}>
              <span className={classes.highlightText}>List your practice</span>{" "}
              on MYDoc to reach more patients and help people find their ideal
              doctor.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            className={classes.signupButton}
            component={Link}
            to="/signup"
          >
            Sign up now
          </Button>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={doctorsImg}
              alt="doctorsImg"
              className={classes.doctorsImg}
            />{" "}
          </Box>
        </Grid>
        <Grid item sm={1} />
      </Grid>
    </div>
  );
}
