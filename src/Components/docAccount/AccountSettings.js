import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Hidden from "@material-ui/core/Hidden";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

// import {
//   changePassword
// } from "../../redux/actions/userActions";

// 新加 5/14
// 不确定要不要改所以先comment掉functions

const useStyles = makeStyles((theme) => ({
  ...theme.account,
}));

function AccountSettings(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    newUsername: "",
    newEmail: "",
    currentPassword: "",
    // newPassword: ""
  });

  // // username
  // const [username1, setUsername] = React.useState("");
  // // email
  // const [email1, setEmail] = React.useState("");

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  const handleUsernameChange = (event) => {
    setState({
      newUserName: event.target.value,
    });
  };

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handleEmailChange = (event) => {
    setState({
      newEmail: event.target.value,
    });
  };

  const handleCurrentPasswordChange = (event) => {
    setState({
      ...state,
      currentPassword: event.target.value,
    });
  };

  // const handleNewPasswordChange = (event) => {
  //   setState({
  //     ...state,
  //     newPassword: event.target.value
  //   });
  // };

  // const submitNewSetting = () => {
  //   // props.changePassword(state.currentPassword, state.newPassword)
  // }

  const {
    user: {
      credentials: { username, email },
    },
  } = props;

  if (!username) {
    return (
      <div>
          
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "10%" }}
        />
            
      </div>
    );
  } else {
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
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              onChange={handleUsernameChange}
              defaultValue={username}
            />
            <br></br>
            <br></br>
            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              onChange={handleEmailChange}
              defaultValue={email}
            />
            <br></br>
            <br></br>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              onChange={handleCurrentPasswordChange}
            />
            {/* <br></br>
            <br></br>
            <TextField fullWidth label="Enter new password" variant="outlined" onChange={handleNewPasswordChange} /> */}
            <br></br>
            <br></br>
            <br></br>

            <Button
              disabled
              variant="contained"
              color="primary"
              style={{ textTransform: "none", float: "right" }}
              size="large"
              // onClick={submitNewSetting}
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
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  // changePassword
};

export default connect(mapStateToProps, mapActionsToProps)(AccountSettings);