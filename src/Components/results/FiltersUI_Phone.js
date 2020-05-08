import React from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import props from "prop-types";
import FilterListIcon from "@material-ui/icons/FilterList";
//filter functions
import {
  HospitalType,
  Languages,
  YearsOfPractice,
  Location,
} from "./FiltersFunctions";

const useStyles = makeStyles((theme) => ({
  //filters
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },

  filterButton: {
    margin: theme.spacing(3, 0),
    width: 120,
    height: 48,
    textTransform: "none",
    fontSize: "1rem",
    border: "1px solid rgba(0, 0, 0, 0.12)",
  },
}));

//filter button for small screens
export function FilterButtonPhone(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" ml={8}>
        <br></br>
        <br></br>
        <HospitalType filterHosType={props.filterHosType} />
        <br></br>
        <br></br>
        <Languages filterLanguageList={props.filterLanguageList} />
        <br></br>
        <br></br>
        {/* NOT DONE YET - If display by doctor, filter sidebar will show years of practice; 
            if display by hospital, filter sidebar will show location */}
        <YearsOfPractice />
      </Box>
    </div>
  );

  return (
    <div>
      {["Filter"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            className={classes.filterButton}
            variant="outlined"
            startIcon={<FilterListIcon />}
            color="primary"
            onClick={toggleDrawer(anchor, true)}
          >
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
