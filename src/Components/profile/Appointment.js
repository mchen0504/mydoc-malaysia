import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

//icons
import onsiteIcon from "../../img/profile/hospital.png";
import phoneIcon from "../../img/profile/phone.png";
import onlineIcon from "../../img/profile/link.png";
import emailIcon from "../../img/profile/mail.png";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: "20%",
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "15%",
    },
  },
  divider: {
    height: 2,
    width: 172,
    backgroundColor: "#FF8686",
  },
  appointmentBox: {
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
}));

//Make appointment section (used in Profile.js inside pages folder)
export default function Appointment(props) {
  const classes = useStyles();

  // create grid based on appointment list
  let appointment = props.targetDoc["appointment"];
  let appointmentList = [];
  for (let appointmentType in appointment) {
    if (
      appointmentType == "email" &&
      appointment[appointmentType]["status"] == true
    ) {
      appointmentList.push(
        <Grid item xs={6} sm={2} key="email">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <img src={emailIcon} className={classes.icon} alt="emailicon"></img>
            <br></br>
            <Link style={{ textDecoration: "underline" }}>
              <a
                href={"mailto:" + appointment[appointmentType]["content"]}
                target="_blank"
                style={{ color: "#003367" }}
              >
                Email
              </a>
            </Link>
          </Box>
        </Grid>
      );
    }
    if (
      appointmentType == "online" &&
      appointment[appointmentType]["status"] == true
    ) {
      appointmentList.push(
        <Grid item xs={6} sm={2} key="online">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <img
              src={onlineIcon}
              className={classes.icon}
              alt="onlineicon"
            ></img>
            <br></br>
            <Link style={{ textDecoration: "underline" }}>
              <a
                href={appointment[appointmentType]["content"]}
                target="_blank"
                style={{ color: "#003367" }}
              >
                Online
              </a>
            </Link>
          </Box>
        </Grid>
      );
    }

    if (
      appointmentType == "onsite" &&
      appointment[appointmentType]["status"] == true
    ) {
      appointmentList.push(
        <Grid item xs={6} sm={2} key="onsite">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <img
              src={onsiteIcon}
              className={classes.icon}
              alt="onsiteicon"
            ></img>
            <br></br>

            <Typography variant="body1" color="primary">
              On site
            </Typography>
          </Box>
        </Grid>
      );
    }

    if (
      appointmentType == "call" &&
      appointment[appointmentType]["status"] == true
    ) {
      appointmentList.push(
        <Grid item xs={6} sm={2} key="call">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mb={2}
          >
            <img src={phoneIcon} className={classes.icon} alt="phoneicon"></img>
            <br></br>
            <Link style={{ textDecoration: "underline" }}>
              <a
                href={"tel:" + appointment[appointmentType]["content"]}
                target="_blank"
                style={{ color: "#003367" }}
              >
                Call
              </a>
            </Link>
          </Box>
        </Grid>
      );
    }
  }

  return (
    <div>
      <Box
        mt={2}
        mb={5}
        display="flex"
        flexDirection="column"
        className={classes.appointmentBox}
      >
        <Typography variant="h6" color="primary">
          Make Appointment
        </Typography>
        <Divider className={classes.divider} />
      </Box>
      <Grid container spacing={0}>
        <Grid item sm={2}></Grid>
        {appointmentList}
        <Grid item sm={2}></Grid>
      </Grid>
    </div>
  );
}
