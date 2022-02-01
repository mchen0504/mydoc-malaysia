import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import GlobalLocation from "./GlobalLocation";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  //vertical tabs
  verticalTabContainer: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: "flex",
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    color: "#003367",
  },

  search: {
    textTransform: "none",
  },

  // horizontal tabs
  horizontalTabContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

// for horizontal tabs - screen size < ipad
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      width: "100%",
      backgroundColor: "#FF8686",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#003367",
    fontSize: "1em",
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

// Global search tabs + search by specialty/doc/hosp/condition
// Used in GlobalSearch.js inside the dialog
function GlobalSearchTabs(props) {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = useState(0);
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

  let docNames = [];
  let hospNames = [];

  const getDocHosNameList = () => {
    let allInfo = props.searchData;
    for (let spec in allInfo) {
      let targetSpec = allInfo[spec];
      for (let hos in targetSpec.hospitals) {
        let hospital = targetSpec.hospitals[hos];
        hospNames.push({ hospName: hospital.name });
        let doctorsList = hospital.doctors;
        for (let docId in doctorsList) {
          if (doctorsList[docId].publish && !doctorsList[docId].deleted) {
            docNames.push({ docName: doctorsList[docId].name });
          }
        }
      }
    }
    docNames = new Set(docNames.map((e) => JSON.stringify(e)));
    docNames = Array.from(docNames).map((e) => JSON.parse(e));
    hospNames = new Set(hospNames.map((e) => JSON.stringify(e)));
    hospNames = Array.from(hospNames).map((e) => JSON.parse(e));
  };

  getDocHosNameList();

  const handleSearchMethodChange = (event, newValue) => {
    let method = "";
    if (newValue === 0) {
      method = "Specialty";
    } else if (newValue === 1) {
      method = "Doctor";
    } else if (newValue === 2) {
      method = "Hospital";
    } else {
      method = "Condition";
    }
    setValue(newValue);
    setSearchType(method);
  };

  const handleSpecialtySearchKeyChange = (event, newValue) => {
    if (newValue) {
      setSearchValue(newValue.specialty);
    }
  };

  const handleDoctorSearchKeyChange = (event, newValue) => {
    if (newValue) {
      setSearchValue(newValue.docName);
    }
  };

  const handleHospitalSearchKeyChange = (event, newValue) => {
    if (newValue) {
      setSearchValue(newValue.hospName);
    }
  };

  const handleConditionSearchKeyChange = (event, newValue) => {
    if (newValue) {
      setSearchValue(newValue.condition);
    }
  };

  const getTextFieldValue = (event) => {
    setSearchValue(event.target.value);
  };

  const filterOptions = (searchType) => {
    createFilterOptions({
      matchFrom: "start",
      stringify: (option) => option[searchType],
    });
  };

  const handleSearch = () => {
    props.handleClose();
    let searchKeyword = searchValue.replace(/\s+/g, "-");
    history.push(`/results/${searchType}/${searchKeyword}`);
  };

  return (
    <div className={classes.verticalTabContainer}>
      {console.log(conditions)}
      {console.log(specialties)}

      {/* vertical search tabs for screen > ipad size */}
      <Hidden smDown>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleSearchMethodChange}
          aria-label="global search tabs"
          className={classes.tabs}
        >
          <Tab style={{ textTransform: "none" }} label="Specialty" />
          <Tab style={{ textTransform: "none" }} label="Doctor" />
          <Tab style={{ textTransform: "none" }} label="Hospital" />
          <Tab style={{ textTransform: "none" }} label="Condition" />
        </Tabs>
      </Hidden>

      {/* horizontal search tabs for screens < ipad size */}
      <Hidden mdUp>
        <div className={classes.HorizontalTabContainer}>
          <StyledTabs
            value={value}
            onChange={handleSearchMethodChange}
            aria-label="search tabs"
            centered
          >
            <StyledTab label="Specialty" style={{ minWidth: 10 }} />
            <StyledTab label="Doctor" style={{ minWidth: 10 }} />
            <StyledTab label="Hospital" style={{ minWidth: 10 }} />
            <StyledTab label="Condition" style={{ minWidth: 10 }} />
          </StyledTabs>
        </div>
      </Hidden>

      {/* autocomplete: search by specialty */}
      <TabPanel value={value} index={0} style={{ width: "100%" }}>
        <Autocomplete
          options={specialties}
          onChange={handleSpecialtySearchKeyChange}
          getOptionLabel={(option) => option.specialty}
          filterOptions={filterOptions("specialty")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by specialty"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by doctor's name */}
      <TabPanel value={value} index={1} style={{ width: "100%" }}>
        <Autocomplete
          onChange={handleDoctorSearchKeyChange}
          freeSolo
          options={docNames}
          getOptionLabel={(option) => option.docName}
          filterOptions={filterOptions("docName")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by doctor's name"
              variant="outlined"
              onChange={getTextFieldValue}
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by hospital's name */}
      <TabPanel value={value} index={2} style={{ width: "100%" }}>
        <Autocomplete
          onChange={handleHospitalSearchKeyChange}
          options={hospNames}
          freeSolo
          getOptionLabel={(option) => option.hospName}
          filterOptions={filterOptions("hospName")}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={getTextFieldValue}
              label="Search by hospital's name"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>

      {/* autocomplete: search by condition */}
      <TabPanel value={value} index={3} style={{ width: "100%" }}>
        <Autocomplete
          onChange={handleConditionSearchKeyChange}
          options={conditions}
          getOptionLabel={(option) => option.condition}
          filterOptions={filterOptions("condition")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by medical condition"
              variant="outlined"
            />
          )}
        />
        <br></br>
        <GlobalLocation />
        <br></br>
        <Button
          onClick={handleSearch}
          variant="contained"
          color="secondary"
          size="md"
          className={classes.search}
          startIcon={<SearchIcon />}
          fullWidth
        >
          Search
        </Button>
      </TabPanel>
    </div>
  );
}

const mapStateToProps = (state) => ({
  searchData: state.data.searchInfo,
  specialtyListForInput: state.data.specialtyList,
  conditionListForInput: state.data.conditionList,
});

export default connect(mapStateToProps)(GlobalSearchTabs);
