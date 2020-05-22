import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Logo from "../img/login/logo.svg";
import LogoWhite from "../img/login/logo-white.svg";

// material ui
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import PersonIcon from "@material-ui/icons/Person";
import Avatar from "@material-ui/core/Avatar";

//redux
import { connect } from "react-redux";

// User menu component
import UserMenu from "./UserMenu";

import GlobalSearch from "./GlobalSearch";

// material ui style
const styles = (theme) => ({
  appbar: {
    [theme.breakpoints.down("sm")]: {
      background: "transparent",
      position: "static",
    },
    zIndex: theme.zIndex.drawer + 1,
  },

  logo: {
    width: "120px",
    height: "40px",
    align: "left",
    position: "relative",
    marginLeft: -10,
  },

  logowhite: {
    width: "96px",
    height: "28px",
    align: "left",
    position: "relative",
  },
});

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    const { authenticated } = this.props;

    let globalSearch = null;
    if (this.props.currentPage !== "Home" && this.props.currentPage !== "signUp"&& this.props.currentPage !== "login"&& this.props.currentPage != "account") {
      globalSearch = (
        <Box>
          <GlobalSearch {...this.props} />
        </Box>
      );
    }
    return (
      <div>
        <Box display="flex">
          <AppBar className={classes.appbar} position="fixed">
            <Toolbar className="nav-container">
              <Box flexGrow={1}>
                <Button component={Link} to="/">
                  <Hidden only={["xs", "sm"]}>
                    <img src={Logo} alt="logo" className={classes.logo} />
                  </Hidden>
                  <Hidden only={["md", "lg", "xl"]}>
                    <img
                      src={LogoWhite}
                      alt="logo"
                      className={classes.logowhite}
                    />
                  </Hidden>
                </Button>
              </Box>
              {globalSearch}
              <Box>
                {authenticated ? (
                  <Fragment>
                    <UserMenu />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Hidden only={["md", "lg", "xl"]}>
                      <IconButton
                        className={classes.iconButton}
                        component={Link}
                        to="/login"
                      >
                        <Avatar style={{ backgroundColor: "#003367" }}>
                          <PersonIcon />
                        </Avatar>
                      </IconButton>
                    </Hidden>
                    <Hidden only={["xs", "sm"]}>
                      <Button
                        style={{ marginLeft: 20 }}
                        size="small"
                        variant="outlined"
                        color="inherit"
                        component={Link}
                        to="/login"
                      >
                        Login / Sign up
                      </Button>
                    </Hidden>
                  </Fragment>
                )}
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
