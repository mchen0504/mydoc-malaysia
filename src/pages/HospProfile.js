import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";

//components
import Navbar from "../Components/Navbar";
import HospInfo from "../Components/profile/HospInfo";
import HospDetailedInfo from "../Components/profile/HospDetailedInfo";
const styles = (theme) => ({
  line: {
    border: "0.5px solid rgba(0, 0, 0, 0.2)",
    [theme.breakpoints.down("xs")]: {
      border: "5px solid rgba(0, 0, 0, 0.05)",
    },
  },
});

class HospProfile extends Component {
  
  render() {
    window.scrollTo(0, 0);
    // he chen 
    const backToPage = this.props.profileBackToDestination
    const { classes } = this.props;
    return (
      <div>
        <Navbar currentPage='HosProfile' {...this.props}/>
        <HospInfo {...this.props} backTo={backToPage}/>
        <hr className={classes.line}></hr>
        <HospDetailedInfo {...this.props} />
      </div>
    );
  }
}

export default withStyles(styles)(HospProfile);
