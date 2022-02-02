import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 120,
    backgroundColor: "#F8F7F7",
    color: "#003367",
    marginLeft: 20,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  nav: {
    "&:hover": {
      backgroundColor: "#FF8686",
      color: "#FFF",
    },

    "&:visited": {
      backgroundColor: "#FF6d6d",
    },
  },
}));

export default function SideNav() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root} style={{ position: "fixed" }}>
      <List component="nav" aria-label="covid19">
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
          component="a"
          href="#covid"
        >
          <ListItemText primary="COVID-19" />
        </ListItem>
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
          component="a"
          href="#symptoms"
        >
          <ListItemText primary="Symptoms" />
        </ListItem>
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
          component="a"
          href="#prevention"
        >
          <ListItemText primary="Prevention" />
        </ListItem>
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
          component="a"
          href="#testing"
        >
          <ListItemText primary="Testing" />
        </ListItem>
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
          component="a"
          href="#treatment"
        >
          <ListItemText primary="Treatment" />
        </ListItem>
        <ListItem
          className={classes.nav}
          button
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
          component="a"
          href="#inquiries"
        >
          <ListItemText primary="Inquiries" />
        </ListItem>
      </List>
    </div>
  );
}
