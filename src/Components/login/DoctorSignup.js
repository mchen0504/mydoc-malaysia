import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

//material ui
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//redux
import { connect } from "react-redux";
//bring in action
import { signupDoctorUser } from "../../redux/actions/userActions";

// material ui style
const styles = (theme) => ({
  ...theme.auth,
  signupGrid: {
    [theme.breakpoints.only("sm")]: {
      marginLeft: 80,
      marginRight: 80,
    },
  },
});

// Doctor Sign Up Form (used in SignupTab.js)
class DoctorSignup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      medicalRegistrationNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.UI.errors) {
      return {
        errors: props.UI.errors,
      };
    }
    return null;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newDoctorUserData = {
      username: this.state.username,
      medicalRegistrationNumber: this.state.medicalRegistrationNumber,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signupDoctorUser(newDoctorUserData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item md />
          <Grid item md className={classes.signupGrid}>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="username"
                name="username"
                type="text"
                label="Username"
                className={classes.textField}
                helperText={errors.username}
                error={errors.username ? true : false}
                value={this.state.username}
                onChange={this.handleChange}
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
                value={this.state.medicalRegistrationNumber}
                onChange={this.handleChange}
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
                value={this.state.email}
                onChange={this.handleChange}
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
                value={this.state.password}
                onChange={this.handleChange}
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
                value={this.state.confirmPassword}
                onChange={this.handleChange}
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
}

DoctorSignup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupDoctorUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

export default withRouter(
  connect(mapStateToProps, { signupDoctorUser })(
    withStyles(styles)(DoctorSignup)
  )
);
