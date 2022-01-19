import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

//components from Covid folder
import SideNav from "../components/covid/SideNav";
import AboutCovid from "../components/covid/AboutCovid";
import Symptoms from "../components/covid/Symptoms";
import Prevention from "../components/covid/Prevention";
import Testing from "../components/covid/Testing";
import Treatment from "../components/covid/Treatment";
import Inquiries from "../components/covid/Inquiries";
import Navbar from "../components/Navbar";
import CovidAlert from "../components/Alert";

// material ui style
const styles = (theme) => ({
  container: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 50,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 10,
      marginRight: 10,
    },
  },
  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },
});

class Covid extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Navbar currentPage="covid" />
        <div className={classes.covidBox}>
          <CovidAlert />
          <div className={classes.container}>
            <Grid container spacing={0}>
              <Grid item md={2}>
                <SideNav />
              </Grid>
              <Grid item xs={12} md={10}>
                <AboutCovid />
                <Symptoms />
                <Prevention />
                <Testing />
                <Treatment />
                <Inquiries />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Covid);
