import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

export default function AccountSettings() {
  const classes = useStyles();

  return (
    <a id="accountsettings" className={classes.anchor}>
      <Grid container spacing={0}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10} md={8}>
          <Box
            flexGrow={1}
            flexDirection="row"
            mt={4}
            mb={1}
            alignItems="center"
          >
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
              <strong>Account Settings</strong>
            </Typography>
          </Box>

          <br></br>
          <br></br>
          {/* 目前都只是textfield, 要看之后怎么从firebase拿讯息，让user换username/email/password */}
          <TextField fullWidth label="Username" variant="outlined" />
          <br></br>
          <br></br>
          <TextField fullWidth label="Email Address" variant="outlined" />
          <br></br>
          <br></br>
          <TextField fullWidth label="Password" variant="outlined" />
          <br></br>
          <br></br>
          <br></br>

          <Button
            variant="contained"
            color="primary"
            style={{ textTransform: "none", float: "right" }}
            size="large"
          >
            Save
          </Button>
          <br></br>
          <br></br>
        </Grid>
        <Grid item xs={1} md={3}></Grid>
      </Grid>
    </a>
  );
}
