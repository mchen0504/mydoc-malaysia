import Alert from "@material-ui/lab/Alert";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  covidAlert: {
    justifyContent: "center",
  },

  covidInfo: {
    textDecoration: "underline",
  },
});

class CovidAlert extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Alert
          severity="error"
          component={Link}
          to="/covid19"
          className={classes.covidAlert}
        >
          <strong className={classes.covidInfo}>
            COVID-19: Information on Symptoms, Testing and Treatments
          </strong>
        </Alert>
      </div>
    );
  }
}

export default withStyles(styles)(CovidAlert);
