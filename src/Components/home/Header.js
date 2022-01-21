import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

//components
import CovidAlert from "../Alert";
import SearchTabs from "./SearchTabs";
import Location from "./Location";

//image
import headerImg from "../../img/home/doctors-heart.png";

// eshin新加的 5/9/2020
import BodyPartsDialog from "../bodyparts/Body";

import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  ...theme.home,

  container: {
    marginTop: 64,
    [theme.breakpoints.down("sm")]: {
      marginTop: 2,
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: 1,
    },
  },

  headerImg: {
    width: "100%",
    [theme.breakpoints.only("md")]: {
      width: "80%",
    },
  },

  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#003367",
  },

  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 24,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 26,
    },
  },

  headings: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
    },
  },

  search: {
    marginTop: 20,
    height: 48,
    textTransform: "none",
    fontSize: 16,
  },
}));

// Landing page search
export default function Header(props) {
  const classes = useStyles();

  useEffect(() => {
    if (props.searchBegin) {
      return props.doMainSearch(props);
    }
  });

  let renderBodyParts = null;
  if (props.searchMethod === "Condition") {
    renderBodyParts = (
      <BodyPartsDialog
        changeConditionLabel={props.changeConditionLabel}
        bodyPartsDic={props.bodyPartsDic}
      />
    );
  }

  let headerDisplay;
  if (
    !props.conditionListForInput &&
    !props.specialtyListForInput &&
    !props.bodyPartsDic &&
    !props.database
  ) {
    headerDisplay = (
      <CircularProgress
        color="secondary"
        style={{ marginLeft: "35%", marginTop: "5%" }}
      />
    );
  } else {
    headerDisplay = (
      <div>
        <SearchTabs
          database={props.database}
          getKeyWords={props.getKeyWords}
          getSearchMethod={props.getSearchMethod}
          setSearchMethod={props.setSearchMethod}
          setKeywords={props.setKeywords}
          conditionListForInput={props.conditionListForInput}
          specialtyListForInput={props.specialtyListForInput}
          startSearch={props.startSearch}
          conditionLabel={props.conditionLabel}
          changeConditionLabel={props.changeConditionLabel}
        />
        <Location
          getLocationValue={props.getLocationValue}
          currentLocation={props.currentLocation}
        ></Location>
        <Button
          variant="contained"
          color="secondary"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
          onClick={props.startSearch}
        >
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <CovidAlert />

      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={1} sm={1} md={1} lg={2}></Grid>
          <Grid item xs={10} sm={5} md={5} lg={4}>
            <Box mt={16} mb={12}>
              <div className={classes.headings}>
                <Typography
                  variant="h4"
                  className={classes.title}
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Find Your Ideal Doctor
                </Typography>
                <br></br>
                <Typography variant="body1" style={{ color: "white" }}>
                  Quick access to doctor information in Malaysia
                </Typography>
                <br></br>
                {/* <SearchTabs
                  getKeyWords={props.getKeyWords}
                  getSearchMethod={props.getSearchMethod}
                  setSearchMethod={props.setSearchMethod}
                  setKeywords={props.setKeywords}
                  conditionListForInput={props.conditionListForInput}
                  specialtyListForInput={props.specialtyListForInput}
                  startSearch = {props.startSearch}
                  conditionLabel={props.conditionLabel} 
                  changeConditionLabel={props.changeConditionLabel} 
                />
                <Location getLocationValue={props.getLocationValue} currentLocation={props.currentLocation}></Location>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.search}
                  startIcon={<SearchIcon />}
                  fullWidth
                  onClick={props.startSearch}
                >
                  Search
                </Button> */}
                {headerDisplay}
                {/* 5/9/2020eshin 加的， 这个需要再condition tab才出现, 麻烦你了*/}
                <br></br>
                <br></br>
                {/* <BodyPartsDialog /> */}
                {renderBodyParts}
              </div>
            </Box>
          </Grid>
          <Grid item sm={1} md={1} />

          <Grid
            item
            xs={1}
            sm={4}
            md={5}
            lg={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Hidden xsDown>
              <img
                src={headerImg}
                alt="doctor-hearts"
                className={classes.headerImg}
              />
            </Hidden>
          </Grid>
          <Grid item lg={2} />
        </Grid>
      </div>
    </div>
  );
}
