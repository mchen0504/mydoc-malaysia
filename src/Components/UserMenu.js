import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { logoutUser } from "../redux/actions/userActions";

import { connect } from "react-redux";

// material ui style
const useStyles = makeStyles((theme) => ({
  ...theme.userMenu,
}));

// User Menu component (used in Navbar)

function UserMenu(props) {
  const classes = useStyles();

  const [state, setState] = useState({
    anchorEl: null,
    setAnchorEl: null,
  });

  const handleLogout = () => {
    props.logoutUser(props.history);
  };

  const handleMenu = (event) => {
    setState({ anchorEl: event.currentTarget });
  };

  const handleClose = () => {
    setState({ anchorEl: null });
  };

  return (
    <Fragment>
      <IconButton onClick={handleMenu} className={classes.userButton}>
        <Avatar className={classes.avatar}>
          {props.credentials.firstLetter}
        </Avatar>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={state.anchorEl}
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
        open={Boolean(state.anchorEl)}
        onClose={handleClose}
      >
        <div>
          <MenuItem component={Link} to="/account">
            My Account
          </MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </div>
      </Menu>
    </Fragment>
  );
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { logoutUser })(UserMenu);
