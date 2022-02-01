import React, { useState, useEffect, Fragment } from "react";
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
import CircularProgress from "@material-ui/core/CircularProgress";

// components
import CovidAlert from "../Alert";
import DocCard from "./DocCard";
import HospitalCard from "./HospitalCard";
import Empty from "./SearchNotFound";

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

export default function SearchResults(props) {
  const classes = useStyles();
  const {
    setSearchState,
    keyword,
    filtered,
    searchState,
    urlSearchType,
    filters,
    setFilters,
  } = props;

  const [doctors, setDoctors] = useState();
  const [hospitals, setHospitals] = useState();

  const [display, setDisplay] = useState("doctor");
  const handleDisplay = (event, newDisplay) => {
    if (newDisplay != null) {
      setDisplay(newDisplay);
      props.setFilters((filters) => ({
        ...filters,
        yearOfPractice: [1000, -1],
      }));
      setPage(1);
    }
  };

  //store state of pages
  const [page, setPage] = useState(1); //page 1 as default
  const maxPage = 5;

  const handlePageChange = (event, value) => {
    window.scrollTo(0, 0);
    setPage(value);
  };

  // if (props.searchingState == "in-progress" && !props.keywords) {
  //   props.history.push("/");
  //   window.location.reload();
  // }

  useEffect(() => {
    if (filtered) {
      setDoctors(filtered.docInfo);
      setHospitals(filtered.hospitalInfo);
      setSearchState("finished");
    }
  }, [filtered]);

  // create cards for doctors based on results
  let pageNavCount;
  if (display == "doctor") {
    pageNavCount = Math.ceil(doctors?.length / maxPage);
  } else {
    pageNavCount = Math.ceil(hospitals?.length / maxPage);
  }
  // find the index of the first card in the page
  let cardStartIndex = (page - 1) * maxPage;
  let cardEndIndex = 0;
  // find the index of the last card in the page
  if (display == "doctor") {
    if (cardStartIndex + maxPage >= doctors?.length) {
      cardEndIndex = doctors?.length;
    } else {
      cardEndIndex = maxPage + cardStartIndex;
    }
  } else {
    if (cardStartIndex + maxPage >= hospitals?.length) {
      cardEndIndex = hospitals?.length;
    } else {
      cardEndIndex = maxPage + cardStartIndex;
    }
  }

  let allDoccards = [];
  let allHosCards = [];
  if (display == "doctor") {
    if (doctors?.length != 0 && doctors != null) {
      let displayed = doctors.slice(cardStartIndex, cardEndIndex);
      allDoccards = displayed.map((doctor) => {
        return <DocCard {...props} docInfo={doctor} key={doctor.username} />;
      });
    } else {
      allDoccards = <Empty key="empty" />;
    }
  } else {
    if (hospitals?.length != 0 && hospitals != null) {
      let displayed = hospitals.slice(cardStartIndex, cardEndIndex);
      allHosCards = displayed.map((hospital) => {
        return (
          <HospitalCard {...props} hospInfo={hospital} key={hospital.name} />
        );
      });
    } else {
      allHosCards = <Empty key="empty" />;
    }
  }

  let docHosbuttonGroup = [];
  if (urlSearchType != "Doctor") {
    docHosbuttonGroup = (
      <ToggleButtonGroup value={display} exclusive onChange={handleDisplay}>
        <ToggleButton value="doctor" color="primary">
          <Typography color="primary" style={{ textTransform: "none" }}>
            Doctor
          </Typography>
        </ToggleButton>
        <ToggleButton value="hospital">
          <Typography color="primary" style={{ textTransform: "none" }}>
            Hospital
          </Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    );
  }

  let dataInfoNotesDoc = "Display results by doctors";
  let dataInfoNotesHos = "Display results by hospitals";
  if (urlSearchType == "Hospital") {
    dataInfoNotesDoc = "Doctors related to " + '"' + keyword + '"';
    dataInfoNotesHos = "Hospitals related to " + '"' + keyword + '"';
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
                <HospitalType setFilters={setFilters} />
                <br></br>
                <br></br>
                <Languages filters={filters} setFilters={setFilters} />
                <br></br>
                <br></br>
                {/* If display by doctor, filter sidebar will show years of practice;
            if display by hospital, filter sidebar will show location */}
                {/* {display === "doctor" ? <YearsOfPractice filterYear={props.filterYear} /> : <Location filterDrivingTime={props.filterDrivingTime} />} */}
                {display === "doctor" && (
                  <YearsOfPractice setFilters={setFilters} />
                )}
              </Box>
            </div>
          </Drawer>

          {searchState == "in-progress" ? (
            <CircularProgress
              color="secondary"
              style={{ marginLeft: "35%", marginTop: "20%" }}
            />
          ) : (
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
                  {display === "doctor" ? (
                    <Typography
                      style={{
                        marginLeft: 30,
                        marginTop: 30,
                        marginBottom: 30,
                      }}
                      variant="h6"
                      color="primary"
                    >
                      {dataInfoNotesDoc}
                    </Typography>
                  ) : (
                    <Typography
                      style={{
                        marginLeft: 30,
                        marginTop: 30,
                        marginBottom: 30,
                      }}
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
                  <Fragment>{allDoccards}</Fragment>
                ) : (
                  <Fragment>{allHosCards}</Fragment>
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
          )}
        </div>
      </Hidden>

      {/* for small phone screens */}
      {searchState == "in-progress" ? (
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "20%" }}
        />
      ) : (
        <Hidden mdUp>
          <Grid container spacing={0} style={{ marginTop: 20 }}>
            <Grid item xs={1}></Grid>

            <Grid item xs={5} align="left">
              <FilterButtonPhone display={display} setFilters={setFilters} />
            </Grid>
            <Grid item xs={5} align="right">
              <div className={classes.toggleContainer}>{docHosbuttonGroup}</div>
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
              <Fragment>{allDoccards}</Fragment>
            ) : (
              <Fragment>{allHosCards}</Fragment>
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
      )}
    </Fragment>
  );
}
