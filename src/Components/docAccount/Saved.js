import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Link } from "react-router-dom";

import DocCard from "../../Components/results/DocCard";
import HospCard from "../../Components/results/HospitalCard";

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

export default function Saved() {
  const classes = useStyles();

  const [display, setDisplay] = React.useState("doctor"); //display by doctor as default
  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

  return (
    <a id="saved" className={classes.anchor}>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={8}>
          <Box display="flex" mt={4} mb={3} flexWrap="wrap" alignItems="center">
            <Box flexGrow={1} flexDirection="row" mb={1}>
              <Typography variant="h5" color="primary">
                {/* Back button, 手机屏幕才会出现 */}
                <Hidden mdUp>
                  {/* <IconButton> */}
                  <Link to="docaccount">
                    <ArrowBackIosIcon
                      className={classes.backIcon}
                      fontSize="small"
                    />
                  </Link>
                  {/* </IconButton> */}
                </Hidden>
                <strong>Saved</strong>
              </Typography>
            </Box>
            {/* Display by Doctor/Hospital buttons */}
            <Box>
              <ToggleButtonGroup
                value={display}
                exclusive
                onChange={handleDisplay}
              >
                <ToggleButton value="doctor" color="primary">
                  <Typography color="primary" style={{ textTransform: "none" }}>
                    Doctor
                  </Typography>
                </ToggleButton>
                <ToggleButton value="hospital">
                  <Typography color="primary" style={{ textTransform: "none" }}>
                    Hospital
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>{" "}
          </Box>

          <br></br>
          <br></br>

          {/* if user clicks on display by 'doctor', then render doctor cards */}
          {display === "doctor" ? (
            <Fragment>doccard</Fragment>
          ) : (
            <Fragment>hospcard</Fragment>
          )}
        </Grid>
        <Grid item xs={1} md={3}></Grid>
      </Grid>
    </a>
  );
}
