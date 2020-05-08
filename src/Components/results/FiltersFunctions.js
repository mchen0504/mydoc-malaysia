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
    props.filterHosType(event.target.value);
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
  const [changeLanguage, setChangeLanguage] = React.useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setChangeLanguage(true);
  };

  useEffect(()=>{
    if(changeLanguage){
      let languagesList = [];
      for (let key in state){
        if(state[key]){
          languagesList.push(key);
        }
      }
      props.filterLanguageList(languagesList) 
    }
    return setChangeLanguage(false);

  });

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

  const [yearChange, setYearChange] = React.useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setYearChange(true);
  };

  useEffect(()=>{
    if(yearChange){
      let yearRangeTrans = {
        oneyear: [0,1],
        onetofive: [1,5],
        sixtoten: [6,10],
        eleventotwenty: [11,20],
        twenty: [20,100],
      };
      let yearRange = [1000,-1];
      for (let key in state){
        if(state[key]){
          let min = yearRangeTrans[key][0];
          let max = yearRangeTrans[key][1];
          if(yearRange[0] >= min){
            yearRange[0] = min;
          }
          if (yearRange[1] <= max){
            yearRange[1] = max;
          }
        }
      }
      console.log('hi');
      props.filterYear(yearRange);
    }
    return setYearChange(false);

  });

  const { oneyear, onetofive, sixtoten, eleventotwenty, twenty } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Years of Practice</FormLabel>
      <br></br>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={oneyear} onChange={handleChange} name="oneyear" />
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
export function Location() {
  const [state, setState] = React.useState({
    kualalumpur: false,
    selangor: false,
    johor: false,
    melaka: false,
    negerisembilan: false,
    pahang: false,
    perak: false,
    kelantan: false,
    terengganu: false,
    kedah: false,
    pulaupinang: false,
    perlis: false,
    sabah: false,
    sarawak: false,
    labuan: false,
    putrajaya: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    kualalumpur,
    selangor,
    johor,
    melaka,
    negerisembilan,
    pahang,
    perak,
    kelantan,
    terengganu,
    kedah,
    pulaupinang,
    perlis,
    sabah,
    sarawak,
    labuan,
    putrajaya,
  } = state;

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Location</FormLabel>
      <br></br>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={kualalumpur}
              onChange={handleChange}
              name="kualalumpur"
            />
          }
          label="Kuala Lumpur"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selangor}
              onChange={handleChange}
              name="selangor"
            />
          }
          label="Selangor"
        />
        <FormControlLabel
          control={
            <Checkbox checked={johor} onChange={handleChange} name="johor" />
          }
          label="Johor"
        />
        <FormControlLabel
          control={
            <Checkbox checked={melaka} onChange={handleChange} name="melaka" />
          }
          label="Melaka"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={negerisembilan}
              onChange={handleChange}
              name="negerisembilan"
            />
          }
          label="Negeri Sembilan"
        />
        <FormControlLabel
          control={
            <Checkbox checked={pahang} onChange={handleChange} name="pahang" />
          }
          label="Pahang"
        />
        <FormControlLabel
          control={
            <Checkbox checked={perak} onChange={handleChange} name="perak" />
          }
          label="Perak"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={kelantan}
              onChange={handleChange}
              name="kelantan"
            />
          }
          label="Kelantan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={terengganu}
              onChange={handleChange}
              name="terengganu"
            />
          }
          label="Terengganu"
        />
        <FormControlLabel
          control={
            <Checkbox checked={kedah} onChange={handleChange} name="kedah" />
          }
          label="Kedah"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={pulaupinang}
              onChange={handleChange}
              name="pulaupinang"
            />
          }
          label="Pulau Pinang"
        />
        <FormControlLabel
          control={
            <Checkbox checked={perlis} onChange={handleChange} name="perlis" />
          }
          label="Perlis"
        />
        <FormControlLabel
          control={
            <Checkbox checked={sabah} onChange={handleChange} name="sabah" />
          }
          label="Sabah"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sarawak}
              onChange={handleChange}
              name="sarawak"
            />
          }
          label="Sarawak"
        />
        <FormControlLabel
          control={
            <Checkbox checked={labuan} onChange={handleChange} name="labuan" />
          }
          label="labuan"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={putrajaya}
              onChange={handleChange}
              name="putrajaya"
            />
          }
          label="Putrajaya"
        />
      </FormGroup>
    </FormControl>
  );
}
