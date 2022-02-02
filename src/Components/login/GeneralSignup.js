import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { signupGeneralUser } from "../../redux/actions/userActions";
import { validateSignUpData } from "./validateSignUpData";

const useStyles = makeStyles((theme) => ({
  ...theme.auth,
  signupGrid: {
    [theme.breakpoints.only("sm")]: {
      marginLeft: 80,
      marginRight: 80,
    },
  },
}));

function GeneralSignup(props) {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  useEffect(() => {
    if (credentials.username) {
      if (props.UI.errors) {
        if (props.UI.errors === "auth/email-already-in-use") {
          errors.email = "This email is in use";
        } else {
          errors.general = "Something went wrong. Please try again";
        }
        setCredentials((credentials) => ({
          ...credentials,
          errors,
        }));
      }
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials((credentials) => ({
      ...credentials,
      errors: {},
    }));
    const newGeneralUserData = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      confirmPassword: credentials.confirmPassword,
    };
    const errors = validateSignUpData(newGeneralUserData);
    if (Object.keys(errors).length > 0) {
      setCredentials((credentials) => ({ ...credentials, errors }));
    } else {
      axios
        .get(`/checkduplicateusername?username=${newGeneralUserData.username}`)
        .then((res) => {
          if (res.data === "This username is taken") {
            let errors = { username: res.data };
            setCredentials((credentials) => ({ ...credentials, errors }));
          } else {
            props.signupGeneralUser(newGeneralUserData, props.history);
          }
        });
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
      <Grid container className={classes.form}>
        <Grid item md />
        <Grid item md className={classes.signupGrid}>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              className={classes.textField}
              helperText={errors.username}
              error={errors.username ? true : false}
              value={credentials.username}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />

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

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={credentials.confirmPassword}
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
              Sign up
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progress}
                  color="secondary"
                />
              )}
            </Button>

            <small>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#003367" }}
                className={classes.link}
              >
                Log in
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item md />
      </Grid>
    </div>
  );
}

GeneralSignup.propTypes = {
  signupGeneralUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  signupGeneralUser,
};

export default connect(mapStateToProps, mapActionsToProps)(GeneralSignup);
