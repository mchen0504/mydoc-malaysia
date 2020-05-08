import React from "react";

// material ui
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

//filter specialty
const filterSpecialtyOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.specialty,
});

//filter doctor
const filterDocOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.name,
});

//filter hospital
const filterHospOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.hospName,
});

//filter condition
const filterConditionOptions = createFilterOptions({
  matchFrom: "start",
  stringify: (option) => option.condition,
});

// specialties options
const specialties = [
  { specialty: "Allergy and Immunology" },
  { specialty: "Anesthesiology" },
  { specialty: "Gastroenterology" },
];
// doctor name options
const docNames = [
  { name: "Alex Leow" },
  { name: "Alex Tan" },
  { name: "Bryan Lee" },
];
// hospital options
const hospNames = [
  { hospName: "Pantai Hospital Kuala Lumpur" },
  { hospName: "Sunway Medical" },
];
// Conditions options
// const conditions = [{ condition: "Fever" }, { condition: "Headache" }];

function TabPanel(props) {
  const { children, value, index } = props;
  return value === index && <Box mt={2}>{children}</Box>;
}

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

// Search Box for Specialty, Doctor, Hospital, Condition
export default function SearchTabs(props) {
  const classes = useStyles();
  const conditions = props.conditionListForInput;

  const [value, setValue] = React.useState(0);

  const handleSearchMethodChange = (event, newValue) => {
    let method = '';
    if(newValue == 0){
      method = 'Specialty';
    } else if (newValue == 1){
      method = 'Doctor';
    } else if (newValue == 2){
      method = 'Hospital';
    } else {
      method = 'Condition';
    }
    setValue(newValue);
    props.getSearchMethod(method);
  };

  const handleSpecialtySearchKeyChange = (event, newValue) => {
    if(newValue){
      props.setSearchMethod('Specialty');
      props.getKeyWords(newValue.specialty);
    }
    
  };

  const handleDoctorSearchKeyChange = (event, newValue) => {
    if(newValue){
      props.getKeyWords(newValue.name);
    }
    
  };

  const handleHospitalSearchKeyChange = (event, newValue) => {
    if(newValue){
      props.getKeyWords(newValue.hospName);
    }
    
  };

  const handleConditionSearchKeyChange = (event, newValue) => {
    if(newValue){
      props.getKeyWords(newValue.condition);
    }
    
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
          onChange = {handleSpecialtySearchKeyChange}
          options={specialties}
          getOptionLabel={(option) => option.specialty}
          filterOptions={filterSpecialtyOptions}
          renderInput={(params) => (
            <TextField
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
          onChange = {handleDoctorSearchKeyChange}
          options={docNames}
          getOptionLabel={(option) => option.name}
          filterOptions={filterDocOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by doctor's name"
              variant="filled"
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
          onChange = {handleHospitalSearchKeyChange}
          options={hospNames}
          getOptionLabel={(option) => option.hospName}
          filterOptions={filterHospOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by hospital's name"
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
          onChange = {handleConditionSearchKeyChange}
          options={conditions}
          getOptionLabel={(option) => option.condition}
          filterOptions={filterConditionOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search by medical condition"
              variant="filled"
              className={classes.inputRoot}
              InputProps={{ ...params.InputProps, disableUnderline: true }}
            />
          )}
        />
        <br></br>
      </TabPanel>
    </div>
  );
}
