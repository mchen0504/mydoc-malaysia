import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Navbar from "../Components/Navbar";
import DocInfo from "../Components/profile/DocInfo";
import Appointment from "../Components/profile/Appointment";
import DocDetailedInfo from "../Components/profile/DocDetailedInfo";

const styles = (theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
});

class DocProfile extends Component {
  render() {
    const { classes } = this.props;
    window.scrollTo(0, 0);
    // he chen 
    const backToPage = this.props.profileBackToDestination
    return (
      <div>
        {
          // // he chen 
        }
        <Navbar  currentPage='DocProfile' {...this.props}/>
        <DocInfo {...this.props} backTo={backToPage}/>
        <hr className={classes.line}></hr>
        <Appointment {...this.props}/>
        <hr className={classes.line}></hr>
        <DocDetailedInfo {...this.props}/>
      </div>
    );
  }
}

export default withStyles(styles)(DocProfile);
