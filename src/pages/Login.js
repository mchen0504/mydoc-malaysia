import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

// Doctor heart background
import Bg from "../img/login/doctors-heart.png";

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import store from "../redux/store";
import { SET_AUTHENTICATED } from "../redux/types";

import Navbar from "../components/Navbar";
import CovidAlert from "../components/Alert";

const useStyles = makeStyles((theme) => ({
  ...theme.auth,
  bg: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
    width: "300px",
    height: "300px",
    position: "fixed",
    margin: 0,
    padding: 0,
    right: -120,
    bottom: 0,
  },

  covidBox: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
    },
  },
}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    errors: {},
  });

  useEffect(() => {
    if (props.UI.errors) {
      if (props.UI.errors === "auth/user-not-found") {
        errors.email = "There is no account associated with this email";
      } else if (props.UI.errors === "auth/wrong-password") {
        errors.general = "Wrong password";
      } else {
        errors.general = "Something went wrong. Please try again";
      }
      setCredentials((credentials) => ({
        ...credentials,
        errors,
      }));
    }
  }, [props.UI.errors]);

  useEffect(() => {
    const token = localStorage.FBIdToken;
    if (token) {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials((credentials) => ({
      ...credentials,
      errors: {},
    }));
    const userData = {
      email: credentials.email,
      password: credentials.password,
    };

    let errors = {};
    const isEmpty = (string) => {
      if (string.trim() === "") return true;
      else return false;
    };
    if (isEmpty(userData.email))
      errors.email = "Email address must not be empty";
    if (isEmpty(userData.password))
      errors.password = "Password must not be empty";

    if (Object.keys(errors).length > 0) {
      setCredentials((credentials) => ({ ...credentials, errors }));
    } else {
      props.loginUser(userData, history);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((credentials) => ({
      ...credentials,
      [name]: value,
    }));
  };

  const {
    UI: { loading },
  } = props;
  const { errors } = credentials;

  return (
    <div>
      <Navbar currentPage="login" />
      <div className={classes.covidBox}>
        <CovidAlert />

        <Grid container className={classes.form}>
          <Grid item xs={1} sm={2} md={4} />
          <Grid item xs={10} sm={8} md={4}>
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Typography className={classes.pageTitle}>Log in</Typography>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email address"
                  className={classes.textField}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={credentials.email}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  className={classes.textField}
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  value={credentials.password}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                />
                {errors.general && (
                  <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  fullWidth
                  size="large"
                  disabled={loading}
                >
                  Log in
                  {loading && (
                    <CircularProgress
                      size={30}
                      className={classes.progress}
                      color="secondary"
                    />
                  )}
                </Button>

                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    style={{ color: "#003367" }}
                    className={classes.link}
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            </Box>
          </Grid>
          <Grid item xs={1} sm={2} md={4} />
          <img src={Bg} alt="doctor-hearts" className={classes.bg} />
        </Grid>
      </div>
    </div>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(Login);
