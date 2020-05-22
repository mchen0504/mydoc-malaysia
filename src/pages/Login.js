import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// material ui
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

// Doctor heart background
import Bg from "../img/login/doctors-heart.png";

//redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { getSpecProfile } from "../redux/actions/userActions";
import { getSpecList } from "../redux/actions/userActions";
import { getCondList } from "../redux/actions/userActions";

import store from "../redux/store";
import { SET_AUTHENTICATED } from "../redux/types";

// components
import Navbar from "../Components/Navbar";
import CovidAlert from "../Components/Alert";

// material ui style
const styles = (theme) => ({
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
});

// Login page
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

  componentDidUpdate() {
    const token = localStorage.FBIdToken;
    if (token) {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common["Authorization"] = token;
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    // this.props.loginUser(userData, this.props.history);
    this.getStoredData(userData);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


  getStoredData = async (userData) => {
    await this.props.loginUser(userData, this.props.history);
    // console.log(2)
    // await this.props.getSpecProfile();
    // console.log(3)
    // await this.props.getSpecList();
    // await this.props.getCondList();
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <Navbar currentPage="login" />
        <div className={classes.covidBox}>
          <CovidAlert />

          <Grid container className={classes.form}>
            <Grid item xs={1} sm={2} md={4} />
            <Grid item xs={10} sm={8} md={4}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Typography className={classes.pageTitle}>Log in</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
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
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});


const mapActionsToProps = {
  getSpecProfile,
  getSpecList,
  getCondList,
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(
  withStyles(styles)(Login)
);
