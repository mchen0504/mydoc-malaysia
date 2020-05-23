import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

// material ui
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core/styles";
import { logoutUser } from "../redux/actions/userActions";

// redux
import { connect } from "react-redux";

// material ui style
const styles = (theme) => ({
  ...theme.userMenu,
});

// User Menu component (used in Navbar)
class UserMenu extends Component {
  state = {
    anchorEl: null,
    setAnchorEl: null,
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      user: {
        credentials: { firstLetter, userType },
      },
    } = this.props;

    return (
      <Fragment>
        <IconButton onClick={this.handleMenu} className={classes.userButton}>
          <Avatar className={classes.avatar}>{firstLetter}</Avatar>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={this.state.anchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <div>
            {/* 目前是link to docaccount (我还没弄Useraccount) 5/1/2020 */}
            <MenuItem component={Link} to="/account">
              My Account
            </MenuItem>
            <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
          </div>
        </Menu>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(UserMenu)
);
