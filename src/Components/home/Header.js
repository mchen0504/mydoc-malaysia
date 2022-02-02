import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import CircularProgress from "@material-ui/core/CircularProgress";

import CovidAlert from "../Alert";
import SearchTabs from "./SearchTabs";
import Location from "./Location";
import BodyPartsDialog from "../bodyparts/Body";

import headerImg from "../../img/home/doctors-heart.png";

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
function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [bodyPartsDic, setBodyPartsDic] = useState();
  const [searchType, setSearchType] = useState("Specialty");
  const [searchValue, setSearchValue] = useState();

  let conditions = [];
  Object.keys(props.conditionListForInput).forEach((key) => {
    conditions.push({ condition: key });
  });

  let specialties = [];
  Object.keys(props.specialtyListForInput).forEach((key) => {
    specialties.push({ specialty: key });
  });

  useEffect(() => {
    axios
      .get("/bodyparts")
      .then((res) => {
        setBodyPartsDic(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  let renderBodyParts = null;
  if (searchType === "Condition") {
    renderBodyParts = (
      <BodyPartsDialog
        setSearchValue={setSearchValue}
        setConditionLabel={props.setConditionLabel}
        changeConditionLabel={props.changeConditionLabel}
        bodyPartsDic={bodyPartsDic}
      />
    );
  }

  const handleSubmit = () => {
    props.setConditionLabel("");
    let searchKeyword = searchValue.replace(/\s+/g, "-");
    history.push(`/results/${searchType}/${searchKeyword}`);
  };

  let headerDisplay;
  if (
    !props.searchData &&
    !props.conditionListForInput &&
    !props.specialtyListForInput &&
    !bodyPartsDic
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
          searchData={props.searchData}
          searchType={searchType}
          setSearchType={setSearchType}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          conditions={conditions}
          specialties={specialties}
          conditionLabel={props.conditionLabel}
          setConditionLabel={props.setConditionLabel}
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
          onClick={handleSubmit}
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
                {headerDisplay}
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

const mapStateToProps = (state) => ({
  searchData: state.data.searchInfo,
  specialtyListForInput: state.data.specialtyList,
  conditionListForInput: state.data.conditionList,
});

export default connect(mapStateToProps)(Header);
