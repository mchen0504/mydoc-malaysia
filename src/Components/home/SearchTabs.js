import React, { useState } from "react";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    "& .MuiFilledInput-root": {
      backgroundColor: "rgba(255,255,255)",
      borderRadius: 4,
    },
    [theme.breakpoints.down("md")]: {
      variant: "outline",
    },
  },

  tabContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

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
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1em",
    marginTop: 10,
    "&:focus": {
      opacity: 1,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.75em",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.7em",
    },
  },
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box mt={2}>{children}</Box>;
}

// Search Box for Specialty, Doctor, Hospital, Condition
export default function SearchTabs(props) {
  const classes = useStyles();

  const conditions = props.conditionListForInput;
  const specialties = props.specialtyListForInput;

  const [value, setValue] = useState(0);
  const [keyword, setkeyword] = useState("");

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
    props.setSearchType(method);
  };

  let docNames = [];
  let hospNames = [];

  const getDocHosNameList = () => {
    let allInfo = props.database;
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

  const handleSpecialtySearchKeyChange = (event, newValue) => {
    if (newValue) {
      props.setSearchValue(newValue.specialty);
    }
  };

  const handleDoctorSearchKeyChange = (event, newValue) => {
    if (newValue) {
      props.setSearchValue(newValue.docName);
    }
  };

  const handleHospitalSearchKeyChange = (event, newValue) => {
    if (newValue) {
      props.setSearchValue(newValue.hospName);
    }
  };

  const handleConditionSearchKeyChange = (event, newValue) => {
    if (newValue) {
      props.setSearchValue(newValue.condition);
      props.setConditionLabel("");
    }
  };

  const getTextFieldValue = (event) => {
    setkeyword(event.target.value);
    props.setSearchValue(event.target.value);
  };

  const filterOptions = (searchType) => {
    createFilterOptions({
      matchFrom: "start",
      stringify: (option) => option[searchType],
    });
  };

  return (
    <div>
      <div className={classes.tabContainer}>
        <StyledTabs
          value={value}
          onChange={handleSearchMethodChange}
          aria-label="search tabs"
        >
          <StyledTab label="Specialty" style={{ minWidth: 10 }} />
          <StyledTab label="Doctor" style={{ minWidth: 10 }} />
          <StyledTab label="Hospital" style={{ minWidth: 10 }} />
          <StyledTab label="Condition" style={{ minWidth: 10 }} />
        </StyledTabs>
      </div>

      {/* autocomplete: search by specialty */}
      <TabPanel value={value} index={0}>
        <Autocomplete
          onChange={handleSpecialtySearchKeyChange}
          options={specialties}
          getOptionLabel={(option) => option.specialty}
          filterOptions={filterOptions("specialty")}
          disabled={
            props.database === undefined ||
            props.specialtyListForInput === undefined
          }
          renderInput={(params) => (
            <TextField
              // disabled={true}
              {...params}
              label="Search by specialty"
              variant="filled"
              className={classes.inputRoot}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          )}
        />
        <br></br>
      </TabPanel>

      {/* autocomplete: search by doctor's namey */}
      <TabPanel value={value} index={1}>
        <Autocomplete
          onChange={handleDoctorSearchKeyChange}
          freeSolo
          options={docNames}
          getOptionLabel={(option) => option.docName}
          filterOptions={filterOptions("docName")}
          disabled={
            props.database === undefined ||
            props.specialtyListForInput === undefined
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by doctor name"
              variant="filled"
              onChange={getTextFieldValue}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  props.getKeyWords(keyword);
                }
              }}
              className={classes.inputRoot}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          )}
        />
        <br></br>
      </TabPanel>

      {/* autocomplete: search by hospital's name */}
      <TabPanel value={value} index={2}>
        <Autocomplete
          onChange={handleHospitalSearchKeyChange}
          freeSolo
          options={hospNames}
          getOptionLabel={(option) => option.hospName}
          filterOptions={filterOptions("hospName")}
          disabled={
            props.database === undefined ||
            props.specialtyListForInput === undefined
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by hospital name"
              onChange={getTextFieldValue}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  props.getKeyWords(keyword);
                  props.startSearch();
                }
              }}
              variant="filled"
              className={classes.inputRoot}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          )}
        />
        <br></br>
      </TabPanel>

      {/* autocomplete: search by condition */}
      <TabPanel value={value} index={3}>
        <Autocomplete
          onChange={handleConditionSearchKeyChange}
          options={conditions}
          getOptionLabel={(option) => option.condition}
          filterOptions={filterOptions("condition")}
          disabled={
            props.database === undefined ||
            props.conditionListForInput === undefined ||
            props.specialtyListForInput === undefined
          }
          renderInput={(params) => {
            if (props.conditionLabel !== "") {
              params.inputProps.value = props.conditionLabel;
            }
            return (
              <TextField
                {...params}
                label={"Search by medical condition"}
                variant="filled"
                className={classes.inputRoot}
                InputProps={{ ...params.InputProps, disableUnderline: true }}
              />
            );
          }}
        />
        <br></br>
      </TabPanel>
    </div>
  );
}
