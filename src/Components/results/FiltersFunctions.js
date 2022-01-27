import React, { useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

//These filters functions are imported in 'SearchResult.js'
// Filter: hospital type
export function HospitalType(props) {
  const [value, setValue] = React.useState("both");

  const handleChange = (event) => {
    props.setFilters((filters) => ({
      ...filters,
      hosType: event.target.value,
    }));
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Hospital Type</FormLabel> <br></br>
      <RadioGroup
        aria-label="hospital-type"
        name="hospital-type"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="both" control={<Radio />} label="Both" />
        <FormControlLabel value="public" control={<Radio />} label="Public" />
        <FormControlLabel value="private" control={<Radio />} label="Private" />
      </RadioGroup>
    </FormControl>
  );
}

// Filter: languages
export function Languages(props) {
  const [state, setState] = React.useState({
    English: false,
    Malay: false,
    Mandarin: false,
    Tamil: false,
    Cantonese: false,
  });
  // const [changeLanguage, setChangeLanguage] = React.useState(true);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    let languagesList = [];
    for (let key in state) {
      if (state[key]) {
        languagesList.push(key);
      }
    }
    props.setFilters((filters) => ({
      ...filters,
      languageList: languagesList,
    }));
  }, [state]);

  const { English, Malay, Mandarin, Tamil, Cantonese } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Languages</FormLabel>
      <br></br>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={English}
              onChange={handleChange}
              name="English"
            />
          }
          label="English"
        />
        <FormControlLabel
          control={
            <Checkbox checked={Malay} onChange={handleChange} name="Malay" />
          }
          label="Malay"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Mandarin}
              onChange={handleChange}
              name="Mandarin"
            />
          }
          label="Mandarin"
        />
        <FormControlLabel
          control={
            <Checkbox checked={Tamil} onChange={handleChange} name="Tamil" />
          }
          label="Tamil"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={Cantonese}
              onChange={handleChange}
              name="Cantonese"
            />
          }
          label="Cantonese"
        />
      </FormGroup>
    </FormControl>
  );
}

// Filter: years of practice
export function YearsOfPractice(props) {
  const [state, setState] = React.useState({
    oneyear: false,
    onetofive: false,
    sixtoten: false,
    eleventotwenty: false,
    twenty: false,
  });

  // const [yearChange, setYearChange] = React.useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    // setYearChange(true);
  };

  useEffect(() => {
    let yearRangeTrans = {
      oneyear: [0, 1],
      onetofive: [1, 5],
      sixtoten: [6, 10],
      eleventotwenty: [11, 20],
      twenty: [20, 100],
    };
    let yearRange = [1000, -1];
    for (let key in state) {
      if (state[key]) {
        let min = yearRangeTrans[key][0];
        let max = yearRangeTrans[key][1];
        if (yearRange[0] >= min) {
          yearRange[0] = min;
        }
        if (yearRange[1] <= max) {
          yearRange[1] = max;
        }
      }
    }
    props.setFilters((filters) => ({
      ...filters,
      yearOfPractice: yearRange,
    }));
  }, [state]);

  const { oneyear, onetofive, sixtoten, eleventotwenty, twenty } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Years of Practice</FormLabel>
      <br></br>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={oneyear}
              onChange={handleChange}
              name="oneyear"
            />
          }
          label="< 1 year"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={onetofive}
              onChange={handleChange}
              name="onetofive"
            />
          }
          label="1 - 5 years"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sixtoten}
              onChange={handleChange}
              name="sixtoten"
            />
          }
          label="6 - 10 years"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={eleventotwenty}
              onChange={handleChange}
              name="eleventotwenty"
            />
          }
          label="11 - 20 years"
        />
        <FormControlLabel
          control={
            <Checkbox checked={twenty} onChange={handleChange} name="twenty" />
          }
          label="> 20 years"
        />
      </FormGroup>
    </FormControl>
  );
}

// Filter: location
export function Location(props) {
  const [state, setState] = React.useState({
    lessThan30mins: false,
    between30minsTo1hour: false,
    between1hourTo2hours: false,
    between2hoursTo3hours: false,
    over3hours: false,
  });

  const [timeDomain, settimeDomain] = React.useState(true);

  useEffect(() => {
    if (timeDomain) {
      let timeRangeTrans = {
        lessThan30mins: [0, 0.5],
        between30minsTo1hour: [0.5, 1],
        between1hourTo2hours: [1, 2],
        between2hoursTo3hours: [2, 3],
        over3hours: [3, 1000],
      };
      let timeRange = [1000, -1];
      for (let key in state) {
        if (state[key]) {
          let min = timeRangeTrans[key][0];
          let max = timeRangeTrans[key][1];
          if (timeRange[0] >= min) {
            timeRange[0] = min;
          }
          if (timeRange[1] <= max) {
            timeRange[1] = max;
          }
        }
      }
      props.filterDrivingTime(timeRange);
    }
    return settimeDomain(false);
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    settimeDomain(true);
  };

  const {
    lessThan30mins,
    between30minsTo1hour,
    between1hourTo2hours,
    between2hoursTo3hours,
    over3hours,
  } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Driving time</FormLabel>
      <br></br>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={lessThan30mins}
              onChange={handleChange}
              name="lessThan30mins"
            />
          }
          label="< 30mins"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={between30minsTo1hour}
              onChange={handleChange}
              name="between30minsTo1hour"
            />
          }
          label="30mins - 1hour"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={between1hourTo2hours}
              onChange={handleChange}
              name="between1hourTo2hours"
            />
          }
          label="1hour - 2hours"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={between2hoursTo3hours}
              onChange={handleChange}
              name="between2hoursTo3hours"
            />
          }
          label="2hours - 3hours"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={over3hours}
              onChange={handleChange}
              name="over3hours"
            />
          }
          label="> 3hours"
        />
      </FormGroup>
    </FormControl>
  );
}
