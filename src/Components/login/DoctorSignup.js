import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

//material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//redux
import { connect } from "react-redux";
//bring in action
import { signupDoctorUser } from "../../redux/actions/userActions";
import { validateSignUpData } from "./validateSignUpData";

// material ui style
const useStyles = makeStyles((theme) => ({
  ...theme.auth,
  signupGrid: {
    [theme.breakpoints.only("sm")]: {
      marginLeft: 80,
      marginRight: 80,
    },
  },
}));

function DoctorSignup(props) {
  const classes = useStyles();

  const [credentials, setCredentials] = useState({
    username: "",
    medicalRegistrationNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
  });

  useEffect(() => {
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
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials((credentials) => ({
      ...credentials,
      errors: {},
    }));
    const newGeneralUserData = {
      username: credentials.username,
      medicalRegistrationNumber: credentials.medicalRegistrationNumber,
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
            props.signupDoctorUser(newGeneralUserData, props.history);
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
      {console.log(credentials.errors)}
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
              id="medicalRegistrationNumber"
              name="medicalRegistrationNumber"
              type="text"
              label="Medical Registration Number"
              className={classes.textField}
              helperText={errors.medicalRegistrationNumber}
              error={errors.medicalRegistrationNumber ? true : false}
              value={credentials.medicalRegistrationNumber}
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
              size="medium"
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

DoctorSignup.propTypes = {
  signupDoctorUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupDoctorUser,
};

export default connect(mapStateToProps, mapActionsToProps)(DoctorSignup);
