import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Hidden from "@material-ui/core/Hidden";

// components
import CovidAlert from "../Alert";
import DocCard from "./DocCard";
import HospitalCard from "./HospitalCard";
import Empty from "./SearchNotFound";
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  HospitalType,
  Languages,
  YearsOfPractice,
  Location,
} from "./FiltersFunctions";
import { FilterButtonPhone } from "./FiltersUI_Phone";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerContainer: {
    overflow: "auto",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  toggleContainer: {
    margin: theme.spacing(3, 0),
  },
}));

export default function SearchResultsFilter(props) {
  const classes = useStyles();

  //store state - whether user clicks on display by doctor or display by hospital
  const [display, setDisplay] = React.useState("doctor"); //display by doctor as default
  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
    }
  };

  //store state of pages
  const [page, setPage] = React.useState(1); //page 1 as default
  const maxPage = 5;

  const handlePageChange = (event, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

    // create cards for doctors based on results
    let pageNavCount = Math.ceil(props.docInfo.length / maxPage);
    // find the index of the first card in the page
    let cardStartIndex = (page - 1)*maxPage;
    let cardEndIndex = 0;
    // find the index of the last card in the page
    if (cardStartIndex + maxPage - 1 > props.docInfo.length){
      cardEndIndex = props.docInfo.length - 1;
    } else {
      cardEndIndex = maxPage - 1 + cardStartIndex;
    }

    let allDoccards = [];
    // // he chen 
    if (props.docInfo.length != 0 && props.docInfo != null){
      for (let i = cardStartIndex; i <= cardEndIndex; i ++){
        let component = <DocCard {...props} updateTargetDoc={props.updateTargetDoc} resultData = {props.docInfo[i]} key = {i}/>
        allDoccards.push(component);
      }
    } else {
      let component;
      if (props.searchingState == 'in-progress'){
        component =  <CircularProgress color="secondary" style={{ marginLeft: '45%', marginTop: '5%' }} />;
      } else {
        component = <Empty/>;
      }
      allDoccards.push(component);
    }
  
    // create cards for doctors based on Hospital
    let allHosCards = [];
    if (props.hospitalInfo.length != 0 && props.hospitalInfo != null){
      let key = 0;
      allHosCards = props.hospitalInfo.map((msgString) => {
          let component = <HospitalCard {...props} resultData = {msgString} key = {key} updateTargetHos={props.updateTargetHos}/>
          key ++;
          return component; //add this new component to resulting array
      })
  } else {
    let component = <Empty/>
    allHosCards.push(component);
  }

  let docHosbuttonGroup = [];
  if (props.searchMethod != 'Doctor'){
    docHosbuttonGroup = <ToggleButtonGroup
                      value={display}
                      exclusive
                      onChange={handleDisplay}
                    >
                      <ToggleButton value="doctor" color="primary">
                        <Typography
                          color="primary"
                          style={{ textTransform: "none" }}
                        >
                          Doctor
                        </Typography>
                      </ToggleButton>
                      <ToggleButton value="hospital">
                        <Typography
                          color="primary"
                          style={{ textTransform: "none" }}
                        >
                          Hospital
                        </Typography>
                      </ToggleButton>
                    </ToggleButtonGroup>
  }

  let dataInfoNotesDoc = 'Display results by doctors';
  let dataInfoNotesHos = 'Display results by hospitals';
  if (props.searchMethod == 'Hospital'){
    dataInfoNotesDoc = 'Doctors related to ' + '"' + props.keywords + '"';
    dataInfoNotesHos = 'Hospitals related to' + props.keywords;
  }
  
  return (
    <Fragment>
      <Hidden smDown>
        <div className={classes.root}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            {/* For filter sidebar */}
            <div className={classes.drawerContainer}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                ml={8}
              >
                <br></br>
                <br></br>
                <HospitalType filterHosType={props.filterHosType}/>
                <br></br>
                <br></br>
                <Languages filterLanguageList={props.filterLanguageList}/>
                <br></br>
                <br></br>
                {/* If display by doctor, filter sidebar will show years of practice;
            if display by hospital, filter sidebar will show location */}
                {display === "doctor" ? <YearsOfPractice filterYear={props.filterYear}/> : <Location filterDrivingTime={props.filterDrivingTime}/>}
              </Box>
            </div>
          </Drawer>
          <main className={classes.content}>
            <Toolbar />
            {/* Covid Alert */}
            <div
              className={classes.covidBox}
              style={{ marginLeft: 30, marginRight: 30 }}
            >
              <CovidAlert />
            </div>
            {/* Search result content starts here */}
            <Grid container spacing={0}>
              <Grid item sm={9} lg={10}>
                {/* if user clicks on 'doctor' button, then render 'display results by doctors; else 'display results by hospitals'*/}
                {display === "doctor" ? (
                  <Typography
                    style={{ marginLeft: 30, marginTop: 30, marginBottom: 30 }}
                    variant="h6"
                    color="primary"
                  >
                    {dataInfoNotesDoc}
                  </Typography>
                ) : (
                  <Typography
                    style={{ marginLeft: 30, marginTop: 30, marginBottom: 30 }}
                    variant="h6"
                    color="primary"
                  >
                    {dataInfoNotesHos}
                  </Typography>
                )}
              </Grid>
              <Grid item sm={3} lg={2}>
                {/* Display by Doctor/Hospital buttons */}
                <Fragment>
                  <div className={classes.toggleContainer}>
                  {docHosbuttonGroup}
                  </div>
                </Fragment>
              </Grid>
            </Grid>
            <div>
              {/* if user clicks on display by 'doctor', then render doctor cards */}
              {display === "doctor" ? (
                <Fragment>
                  {allDoccards}
                </Fragment>
              ) : (
                <Fragment>
                  {allHosCards}
                </Fragment>
              )}
            </div>
            {/* For pages at bottom */}
            <Box display="flex" justifyContent="center">
              <Pagination
                count={pageNavCount}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
              />
            </Box>
          </main>
        </div>
      </Hidden>

      {/* for small phone screens */}
      <Hidden mdUp>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={1}></Grid>

          <Grid item xs={5} align="left">
            <FilterButtonPhone filterLanguageList={props.filterLanguageList} filterHosType={props.filterHosType} />
          </Grid>
          <Grid item xs={5} align="right">
            <div className={classes.toggleContainer}>
            {docHosbuttonGroup}
            </div>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {/* If display by doctor, render DocCard; if display by Hospital, render HospitalCard */}
          {display === "doctor" ? (
            <Fragment>
              {allDoccards}
            </Fragment>
          ) : (
            <Fragment>
             {allHosCards}
            </Fragment>
          )}
        </Box>
        <Box display="flex" justifyContent="center">
          <Pagination
            count={pageNavCount}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            color="primary"
          />
        </Box>
      </Hidden>
    </Fragment>
  );
}
