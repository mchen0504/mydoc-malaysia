// -------------------- ------------------------- //
// 你需要去app.js, userReducer, userAction, type, 加入其他东西

import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Autocomplete from "@material-ui/lab/Autocomplete";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";

import {
  // to "specialties" collection
  sendProfileToSpec,

  // to "users" collection
  sendAccountProfile,

  // to "inputList" collection
  sendSpecList,
  sendCondList,

  // disable original account if doctor has changed hospital/specialty in "specialties" collection
  deleteProfileInSpec,
  publish,
  getSpecProfile,
  getSpecList,
  getCondList,
} from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  anchor: {
    display: "block",
    paddingTop: 100,
    marginTop: -100,
  },
  chip: {
    marginTop: "0.3rem",
    marginRight: "0.3rem",
  },
}));

// doctor edit profile
function DocEditProfile(props) {
  const classes = useStyles();

  // --------------------------- initialize states --------------------------- //

  // putting most inputs in one state, initialize states
  const [allState, setAllState] = React.useState({
    // personal
    firstName: "",
    lastName: "",
    gender: "",
    yearsOfPractice: "",

    // work
    hospital: "",

    // check if hospital has changed
    removedHospital: "",
    type: "",
    phone: "",
    buildingInfo: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",

    // appt
    call: false,
    online: false,
    email: false,
    onsite: true,

    callNumber: "",
    onlineLink: "",
    emailAddress: "",

    // expertise
    specialty: "",

    // check if specialty has changed
    removedSpecialty: "",
    qualifications: "",
    procedures: [],

    // to store one procedure entered
    newProc: "",
    conditions: [],

    // check if conditions have changed
    removedConditions: [],

    // to store one condition entered
    newCond: "",
    languages: [],

    // to enable publish if there is spec/hosp info in database (user already filled out and submitted the profile)
    specOrNot: "",
    hospOrNot: "",
  });

  // submit success alert
  const [open, setOpen] = React.useState(false);

  // to stop fetching data after the first round
  const [renderCount, setRenderCount] = React.useState(0);

  // to store inputList (specialty & conditions) data returned from database so I can compare and send new lists to replace the ones in database
  const [list, setList] = React.useState({
    specialtyList: {},
    conditionsList: {},
  });

  //publish switch
  const [publish, setPublish] = React.useState(false);

  // -------------------------------------------------------------------- //

  // get data
  // only call useEffect if renderCount = 0 (will be updated to 1 if stored data
  useEffect(() => {
    // if (renderCount == 0) {
    // console.log('in the mission');
    console.log("hi: 1");
    getStoredData();
    // }
  }, []);

  // if (res[0] && res[1] && res[2] && res[3] && Object.keys(res[0]).length > 0 && Object.keys(res[1]).length > 0 && Object.keys(res[2]).length > 0 && Object.keys(res[3]).length > 0) {

  let getStoredData = async () => {
    let baseurl =
      "https://cors-anywhere.herokuapp.com/https://us-central1-mydoc-f3cd9.cloudfunctions.net/api/";
    // let storedSearchInfo2 = await axios.get(baseurl+'getspecprofile');
    // let userInfo = props.credentials;
    // let storedSearchInfo =  props.doctorData;
    // let specialtyList =  props.specialtyList;
    // let conditionsList =  props.conditionsList;
    let storedSearchInfoData = await axios.get(baseurl + "getspecprofile");
    let specialtyListData = await axios.get(baseurl + "getspeclist");
    let conditionsListData = await axios.get(baseurl + "getcondlist");
    let userInfoData = await axios.get(baseurl + "user");
    let userInfo = userInfoData.data.credentials;
    let storedSearchInfo2 = storedSearchInfoData.data;
    let specialtyList2 = specialtyListData.data;
    let conditionsList2 = conditionsListData.data;
    let dataSet = [
      userInfo,
      storedSearchInfo2,
      specialtyList2,
      conditionsList2,
    ];
    const allContents = {
      credentials: dataSet[0],
      doctorData: dataSet[1],
      specialtyList: dataSet[2],
      conditionsList: dataSet[3],
    };

    if (
      allContents.credentials &&
      allContents.doctorData &&
      allContents.specialtyList &&
      allContents.conditionsList &&
      renderCount == 0 &&
      Object.keys(allContents.doctorData).length > 0
    ) {
      let res = [
        allContents.credentials,
        allContents.doctorData,
        allContents.specialtyList,
        allContents.conditionsList,
      ];
      window.scrollTo(0, 0);
      // data -> from doctor account
      console.log("hi here");
      console.log(allContents);
      const userInfo = res[0].profile;

      // data -> from specialty data
      const searchInfo = res[1];

      const apptThings = res[1].appointment;

      // set state
      setAllState({
        ...allState,
        // personal
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        gender: userInfo.gender,
        yearsOfPractice: searchInfo.yearsOfPractice,

        // work
        hospital: searchInfo.hospital,
        removedHospital: searchInfo.hospital,
        type: searchInfo.type,
        phone: searchInfo.phone,
        buildingInfo: userInfo.buildingInfo,
        street: userInfo.street,
        city: userInfo.city,
        state: userInfo.state,
        postalCode: userInfo.postalCode,

        // appt
        call: apptThings.call.status,
        online: apptThings.online.status,
        email: apptThings.email.status,
        onsite: apptThings.onsite.status,

        callNumber: apptThings.call.content,
        onlineLink: apptThings.online.content,
        emailAddress: apptThings.email.content,

        // expertise
        specialty: searchInfo.specialty,
        removedSpecialty: searchInfo.specialty,
        qualifications: searchInfo.qualifications,
        procedures: searchInfo.procedures,
        conditions: searchInfo.conditions,
        removedConditions: searchInfo.conditions,
        languages: searchInfo.languages,

        specOrNot: userInfo.specialty,
        hospOrNot: userInfo.hospital,
      });

      setList({
        specialtyList: res[2],
        conditionsList: res[3],
      });

      setPublish(searchInfo.publish);
      setRenderCount(1);
    } else if (
      allContents.credentials &&
      allContents.doctorData &&
      allContents.specialtyList &&
      allContents.conditionsList &&
      renderCount == 0 &&
      Object.keys(allContents.specialtyList).length > 0
    ) {
      let res = [
        allContents.specialtyList,
        allContents.conditionsList,
      ];
      setList({
        specialtyList: res[0],
        conditionsList: res[1],
      });
      setRenderCount(1);
    } else if (
      allContents.credentials &&
      allContents.doctorData &&
      allContents.specialtyList &&
      allContents.conditionsList &&
      renderCount == 0
    ) {
      setRenderCount(1);
    }

    return [userInfo, storedSearchInfo2, specialtyList2, conditionsList2];

    // return [userInfo, storedSearchInfo];
  };

  // submit success snackbar
  // const [open, setOpen] = React.useState(false);

  // const openSuccessMsg = () => {
  //   setOpen(true);
  // };

  // const closeSuccessMsg = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  // -------------------- functions to change state ------------------------- //

  console.log(list.specialtyList);

  // change publish status
  const handlePublishChange = (event) => {
    let data;
    setPublish(event.target.checked);
    data = {
      specialty: allState.specialty,
      hospital: allState.hospital,
      publish: event.target.checked,
    };
    props.publish(data);
  };

  // personal
  //first name
  const handleFirstNameChange = (event) => {
    setAllState({
      ...allState,
      firstName: event.target.value,
    });
  };

  //last name
  const handleLastNameChange = (event) => {
    setAllState({
      ...allState,
      lastName: event.target.value,
    });
  };

  //gender
  const handleGenderChange = (event) => {
    setAllState({
      ...allState,
      gender: event.target.value,
    });
  };

  // years of practice
  const handleYearsOfPracticeChange = (event) => {
    setAllState({
      ...allState,
      yearsOfPractice: event.target.value,
    });
  };

  // -------------------------------------------------------------------- //

  // work
  // hospital name
  const handleHospitalChange = (event) => {
    setAllState({
      ...allState,
      hospital: event.target.textContent,
    });
  };

  //hospital type
  const handleHospTypeChange = (event) => {
    setAllState({
      ...allState,
      type: event.target.value,
    });
  };

  //phone
  const handlePhoneChange = (event) => {
    setAllState({
      ...allState,
      phone: event.target.value,
    });
  };

  //unit number
  const handleBuildingInfoChange = (event) => {
    setAllState({
      ...allState,
      buildingInfo: event.target.value,
    });
  };

  //street name
  const handleStreetChange = (event) => {
    setAllState({
      ...allState,
      street: event.target.value,
    });
  };

  //unit number
  const handleCityChange = (event) => {
    setAllState({
      ...allState,
      city: event.target.value,
    });
  };

  //state
  const handleStateChange = (event) => {
    setAllState({
      ...allState,
      state: event.target.textContent,
    });
  };

  //postal code
  const handlePostalCodeChange = (event) => {
    setAllState({
      ...allState,
      postalCode: event.target.value,
    });
  };

  // -------------------------------------------------------------------- //

  // appt status
  const handleAppointmentChange = (event) => {
    setAllState({
      ...allState,
      [event.target.name]: event.target.checked,
    });
  };

  //call number
  const handleCallNumberChange = (event) => {
    setAllState({
      ...allState,
      callNumber: event.target.value,
    });
  };

  //online link
  const handleOnlineLinkChange = (event) => {
    setAllState({
      ...allState,
      onlineLink: event.target.value,
    });
  };

  //email address
  const handleEmailAddressChange = (event) => {
    setAllState({
      ...allState,
      emailAddress: event.target.value,
    });
  };

  // -------------------------------------------------------------------- //

  // expertise
  //specialty
  const handleSpecialtyChange = (event) => {
    setAllState({
      ...allState,
      specialty: event.target.textContent,
    });
  };

  //qualifications
  const handleQualificationsChange = (event) => {
    setAllState({
      ...allState,
      qualifications: event.target.value,
    });
  };

  // procedure
  // list to generate one chip for each procedure
  let procList;

  if (allState.procedures) {
    procList = allState.procedures.map((oneProc) => {
      return (
        <Chip
          className={classes.chip}
          size="small"
          label={oneProc}
          key={oneProc}
          // delete one chip
          onDelete={() => {
            const procFilter = allState.procedures.filter(
              (entry) => entry != oneProc
            );
            setAllState({
              ...allState,
              procedures: procFilter,
            });
          }}
        />
      );
    });
  }

  // store one procedure entered by the user to be used below
  const handleProcedureChange = (event) => {
    const newProcValue = event.target.value;
    setAllState({
      ...allState,
      newProc: newProcValue,
    });
  };

  // after pressing "enter", the new value stored will be pushed to the array generating procedure chips
  const handleAddProcButtonChange = (event) => {
    event.preventDefault();
    if (!allState.procedures) {
      const newList = [];
      newList.push(allState.newProc);
      setAllState({
        ...allState,
        procedures: newList,
      });
    } else if (
      // because user can enter two words for one procedure (ex: "XX XX"), so I cannot disable user from
      // entering empty spaces otherwise space in between words won't be allowed. I have disabled several
      // empty space cases here and hopefully users will not enter more than 3 empty spaces. We can fix this later.

      !allState.procedures.includes(allState.newProc) &&
      allState.newProc != "" &&
      allState.newProc != " " &&
      allState.newProc != "  " &&
      allState.newProc != "   " &&
      allState.newProc != "    "
    ) {
      setAllState({
        ...allState,
        procedures: [...allState.procedures, allState.newProc],
        newProc: "",
      });
    }
    // clear the text field after one procedure chip is generated and listed under the textfield
    document.getElementById("procedure").value = "";
  };

  // condition
  // generate one chip for each condition
  let condList;

  if (allState.conditions) {
    condList = allState.conditions.map((oneCond) => {
      return (
        <Chip
          className={classes.chip}
          size="small"
          label={oneCond}
          key={oneCond}
          // delete one chip
          onDelete={() => {
            const condFilter = allState.conditions.filter(
              (entry) => entry != oneCond
            );
            setAllState({
              ...allState,
              conditions: condFilter,
            });
          }}
        />
      );
    });
  }

  // store one procedure entered by the user to be used below
  const handleConditionChange = (event) => {
    const newCondValue = event.target.value;
    setAllState({
      ...allState,
      newCond: newCondValue,
    });
  };

  // after pressing "enter", the new value entered & stored will be pushed to the array generating procedure chips
  const handleAddCondButtonChange = (event) => {
    event.preventDefault();
    if (!allState.conditions) {
      const newList = [];
      newList.push(allState.newCond);
      setAllState({
        ...allState,
        conditions: newList,
      });
    } else if (
      !allState.conditions.includes(allState.newCond) &&
      allState.newCond != "" &&
      allState.newCond != " " &&
      allState.newCond != "  " &&
      allState.newCond != "   " &&
      allState.newCond != "    "
    ) {
      setAllState({
        ...allState,
        conditions: [...allState.conditions, allState.newCond],
        newCond: "",
      });
    }
    // clear the text field
    document.getElementById("condition").value = "";
  };

  // languages
  // generate one chip for each language
  let langList;

  if (allState.languages) {
    langList = allState.languages.map((oneLang) => {
      return (
        <Chip
          className={classes.chip}
          size="small"
          label={oneLang}
          key={oneLang}
          // delete one chip
          onDelete={() => {
            const langFilter = allState.languages.filter(
              (entry) => entry != oneLang
            );
            setAllState({
              ...allState,
              languages: langFilter,
            });
          }}
        />
      );
    });
  }

  // add one language to the array generating chips
  const handleLanguageChange = (event) => {
    event.preventDefault();
    const newLang = event.target.textContent;
    if (!allState.languages) {
      const newList = [];
      newList.push(newLang);
      setAllState({
        ...allState,
        languages: newList,
      });
    } else if (!allState.languages.includes(newLang) && newLang != "") {
      setAllState({
        ...allState,
        languages: [...allState.languages, newLang],
      });
    }
    document.getElementById("language-option").value = "";
  };

  // ------------------  after pressing submit button -------------------------- //

  // reload window after submission，and display "successfuly submitted" message
  window.onload = function () {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
      sessionStorage.removeItem("reloading");
      // display "successfully submitted" message
      setOpen(true);
    }
  };

  // send profile info to firebase after pressing "submit" button

  const sendProfile = (event) => {
    // calculation for new "specialty list" send to "inputList" collection
    const currentSpec = allState.specialty;
    const removedSpec = allState.removedSpecialty;
    const specialtyList = list.specialtyList;

    // if current != removed (doctor changed the specialty), make changes to the specialty list
    // -- for new spec:
    //    -- if the current selected spec already exists in the list, +1 for the spec, if not, add it to the list and give it a count of 0
    // -- for removed spec:
    //    -- if the count for the removed spec is > 1, -1 for that spec in the list, otherwise set it to 0

    if (currentSpec.localeCompare(removedSpec)) {
      if (Object.keys(specialtyList).includes(currentSpec)) {
        specialtyList[currentSpec]++;
      } else {
        if (currentSpec != "") {
          specialtyList[currentSpec] = 1;
        }
      }
      if (specialtyList[removedSpec] > 1) {
        specialtyList[removedSpec]--;
      } else {
        if (removedSpec != "") {
          specialtyList[removedSpec] = 0;
        }
      }
    }

    // calculation for new "condition list" send to "inputList" collection
    let currentCond = allState.conditions;
    let removedCond = allState.removedConditions;
    let conditionsList = list.conditionsList;

    // check the difference (added and removed) between 2 lists
    let added = currentCond.filter((x) => !removedCond.includes(x));
    let removed = removedCond.filter((x) => !currentCond.includes(x));

    // if new conditions are added by the doctor, add them to the condition list
    // if any conditions are removed, -1 or set to 0 similar to what I did to specialty list above
    if (added.length > 0) {
      added.forEach((one) => {
        one = one[0].toUpperCase() + one.slice(1);
        if (Object.keys(conditionsList).includes(one)) {
          conditionsList[one]++;
        } else {
          conditionsList[one] = 1;
        }
      });
    }
    if (removed.length > 0) {
      removed.forEach((one) => {
        one = one[0].toUpperCase() + one.slice(1);
        if (conditionsList[one] > 1) {
          conditionsList[one]--;
        } else {
          conditionsList[one] = 0;
        }
      });
    }

    // calculation for disabling original doctor profile in "specialties" collection if the doctor has changed hospital/specialty
    const removedHospital = allState.removedHospital;
    const currentHospital = allState.hospital;
    if (
      removedHospital.localeCompare(currentHospital) ||
      currentSpec.localeCompare(removedSpec)
    ) {
      const deleteInfo = {
        hospital: removedHospital,
        specialty: removedSpec,
      };
      console.log(deleteInfo);
      if (deleteInfo.hospital != "" && deleteInfo.specialty != "") {
        props.deleteProfileInSpec(deleteInfo);
      }
    }

    // ------------------  data to send  -------------------------- //

    // send to account profile "users" collection
    const accountData = {
      // personal
      firstName: allState.firstName ? allState.firstName : "",
      lastName: allState.lastName ? allState.lastName : "",
      gender: allState.gender ? allState.gender : "",

      // work
      hospital: allState.hospital ? allState.hospital : "",
      buildingInfo: allState.buildingInfo ? allState.buildingInfo : "",
      street: allState.street ? allState.street : "",
      city: allState.city ? allState.city : "",
      state: allState.state ? allState.state : "",
      postalCode: allState.postalCode ? allState.postalCode : "",

      // expertise
      specialty: allState.specialty ? allState.specialty : "",
    };

    // send to account in "specialties" collection
    const specData = {
      // personal
      name: accountData.firstName + " " + accountData.lastName,
      yearsOfPractice: allState.yearsOfPractice ? allState.yearsOfPractice : "",

      // work
      hospital: allState.hospital ? allState.hospital : "",
      type: allState.type ? allState.type : "",
      phone: allState.phone ? allState.phone : "",
      address:
        accountData.buildingInfo +
        ", " +
        accountData.street +
        ", " +
        accountData.city +
        " " +
        accountData.postalCode +
        " " +
        accountData.state,

      // appt
      appointment: {
        call: {
          content: allState.callNumber ? allState.callNumber : "",
          status: allState.call ? allState.call : false,
        },
        email: {
          content: allState.emailAddress ? allState.emailAddress : "",
          status: allState.email ? allState.email : false,
        },
        online: {
          content: allState.onlineLink ? allState.onlineLink : "",
          status: allState.online ? allState.online : false,
        },
        onsite: {
          status: allState.onsite ? allState.onsite : false,
        },
      },

      // expertise
      specialty: allState.specialty ? allState.specialty : "",
      qualifications: allState.qualifications ? allState.qualifications : "",
      procedures: allState.procedures ? allState.procedures : [],
      conditions: allState.conditions ? allState.conditions : [],
      languages: allState.languages ? allState.languages : [],

      // false by default
      deleted: false,

      // publish
      publish: publish ? publish : false,
    };

    // list send to "inputList" collection
    const specListData = {
      specialtyList: specialtyList,
    };

    // list send to "inputList" collection
    const condListData = {
      conditionsList: conditionsList,
    };

    console.log("spec: ", specListData);
    console.log("cond: ", condListData);

    // to user account
    props.sendAccountProfile(accountData);

    // to account in specialty
    props.sendProfileToSpec(specData);

    // send specialty
    props.sendSpecList(specListData);

    // send condition list
    props.sendCondList(condListData);

    setAllState({
      ...allState,
      specOrNot: allState.specialty,
      hospOrNot: allState.hospital,
    });

    window.scrollTo(0, 0);
    setOpen(true);
    props.setProfileWarning(false);

    // // wait for data sent to firebase before reloading the window
    // const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    // // open submit success message
    // // openSuccessMsg();

    // const reload = async () => {
    //   await delay(3000);
    //   window.location.reload();
    // };
    // sessionStorage.setItem("reloading", "true");
    // // reload();
  };

  // -------------------------  errors --------------------------------- //

  // errors (if errors, submit button is disabled)
  let personalError;
  let workError;
  let apptError;
  let expertiseError;

  const firstNameError = !allState.firstName;
  const lastNameError = !allState.lastName;
  const yearsOfPracticeError = !allState.yearsOfPractice;
  personalError = firstNameError || lastNameError || yearsOfPracticeError;

  const hospitalError = !allState.hospital;
  const typeError = !allState.type;
  const phoneError = !allState.phone;
  const streetError = !allState.street;
  const cityError = !allState.city;
  const stateError = !allState.state;
  const postalCodeError = !allState.postalCode;
  workError =
    hospitalError ||
    typeError ||
    phoneError ||
    streetError ||
    cityError ||
    stateError ||
    postalCodeError;

  const callNumError = allState.call && !allState.callNumber;
  const onlineLinkError = allState.online && !allState.onlineLink;
  const emailAddressError = allState.email && !allState.emailAddress;
  apptError = callNumError || onlineLinkError || emailAddressError;

  let letterRegex = /^\S+(?: \S+)*$/ && /^([^0-9]*)$/;

  // only alphabetical letters are allowed for procedures
  let procNotLetter = false;
  if (allState.procedures) {
    const procedureList = allState.procedures;
    procedureList.forEach((one) => {
      if (!one.match(letterRegex)) procNotLetter = true;
    });
  }

  // only alphabetical letters are allowed for conditions
  let condNotLetter = false;
  if (allState.conditions) {
    const conditionList = allState.conditions;
    conditionList.forEach((one) => {
      if (!one.match(letterRegex)) condNotLetter = true;
    });
  }

  const specialtyError = !allState.specialty;
  const qualificationsError = !allState.qualifications;
  const proceduresError = allState.procedures == "" || procNotLetter;
  const conditionsError = allState.conditions == "" || condNotLetter;
  const languageError = allState.languages == "";
  expertiseError =
    specialtyError ||
    qualificationsError ||
    proceduresError ||
    conditionsError ||
    languageError;
  const submitError = personalError || workError || apptError || expertiseError;

  // -------------------------------------------------------------------- //

  if (renderCount == 0) {
    return (
      <div>
          
        <CircularProgress
          color="secondary"
          style={{ marginLeft: "45%", marginTop: "10%" }}
        />
            
      </div>
    );
  } else {
    return (
      <a id="profile" className={classes.anchor}>
        <Grid container spacing={0}>
          <Grid item xs={1}></Grid>
          <Grid item xs={10} md={8}>
            <Box display="flex" mt={4} mb={3} flexWrap="wrap">
              <Box flexGrow={1} flexDirection="row" mb={1}>
                <Typography variant="h5" color="primary">
                  {/* Back button, 手机屏幕才会出现 */}
                  <Hidden mdUp>
                    {/* <IconButton> */}
                    <Link to="account">
                      <ArrowBackIosIcon
                        className={classes.backIcon}
                        fontSize="small"
                      />
                    </Link>
                    {/* </IconButton> */}
                  </Hidden>
                  <strong>Profile</strong>
                </Typography>
              </Box>
              {/* Publish/not publish switch */}
              <Box>
                <Switch
                  disabled={!allState.specOrNot || !allState.hospOrNot}
                  checked={publish}
                  onChange={handlePublishChange}
                  name="checked"
                />
                <span>Publish your profile</span>
              </Box>
            </Box>
            {/* success message after done submitting */}
            {open ? (
              <Alert style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Successfully submitted! If you haven't published your profile,
                you can do it now!
              </Alert>
            ) : (
              ""
            )}
            <br></br>
            <Typography variant="body1">
              Please fill out the profile to the best of your ability. The more
              complete your profile is, the more easily users will be able to
              find you.<br></br>
              <br></br> * Required
            </Typography>
            <br></br>
            <br></br>
            <Box display="flex" mt={2} mb={3}>
              <Typography variant="h6" color="primary">
                Personal Information
              </Typography>
            </Box>
            {/* First name */}
            <TextField
              fullWidth
              error={firstNameError}
              helperText={firstNameError ? "*Required" : ""}
              required
              label="First Name"
              variant="outlined"
              onChange={handleFirstNameChange}
              defaultValue={allState.firstName}
            />
            <br></br>
            <br></br>
            {/* Last name */}
            <TextField
              fullWidth
              error={lastNameError}
              helperText={lastNameError ? "*Required" : ""}
              required
              label="Last Name"
              variant="outlined"
              onChange={handleLastNameChange}
              defaultValue={allState.lastName}
            />
            <br></br>
            <br></br>
            {/* Gender */}
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                value={allState.gender}
                onChange={handleGenderChange}
                label="Gender"
                defaultValue={allState.gender}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
            <br></br>
            <br></br>
            {/* Years of prac */}
            <TextField
              fullWidth
              required
              error={yearsOfPracticeError}
              helperText={yearsOfPracticeError ? "*Required" : ""}
              label="Years of Practice"
              variant="outlined"
              onChange={handleYearsOfPracticeChange}
              defaultValue={allState.yearsOfPractice}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box display="flex" mb={3}>
              <Typography variant="h6" color="primary">
                Work Information
              </Typography>
            </Box>
            {/* Hospital name */}
            <Autocomplete
              options={hospitals}
              getOptionLabel={(option) => option}
              fullWidth
              required
              onChange={handleHospitalChange}
              value={allState.hospital}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Hospital Name"
                  variant="outlined"
                />
              )}
            />
            {hospitalError ? (
              <p
                style={{
                  color: "red",
                  marginBottom: "-1.3rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required
              </p>
            ) : (
              ""
            )}
            <br></br>
            <br></br>
            {/* Hospital type */}
            <FormControl component="fieldset" required>
              <FormLabel component="legend">Hospital Type</FormLabel>
              <RadioGroup
                name="type"
                value={allState.type}
                onChange={handleHospTypeChange}
              >
                <Box>
                  <FormControlLabel
                    value="Public"
                    control={<Radio required />}
                    label="Public"
                    style={{ marginRight: 100 }}
                  />
                  <FormControlLabel
                    value="Private"
                    control={<Radio required />}
                    label="Private"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
            {typeError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "-0.1rem",
                  marginBottom: "-1rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required
              </p>
            ) : (
              ""
            )}
            <br></br>
            <br></br>
            {/* Work phone number */}
            <FormControl
              component="fieldset"
              fullWidth
              style={{ marginBottom: 30 }}
            >
              <FormLabel component="legend" style={{ marginBottom: 20 }}>
                Work Phone Number
              </FormLabel>
              <TextField
                required
                fullWidth
                error={phoneError}
                helperText={phoneError ? "*Required" : ""}
                label="Phone Number"
                variant="outlined"
                onChange={handlePhoneChange}
                defaultValue={allState.phone}
              />
            </FormControl>
            <br></br>
            {/* Work address */}
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" style={{ marginBottom: 20 }}>
                Work Address
              </FormLabel>
              <TextField
                fullWidth
                label="Building Unit/ Floor/ Block"
                variant="outlined"
                onChange={handleBuildingInfoChange}
                defaultValue={allState.buildingInfo}
              />
            </FormControl>
            <br></br>
            <br></br>
            <TextField
              required
              fullWidth
              error={streetError}
              helperText={streetError ? "*Required" : ""}
              label="Street Name"
              variant="outlined"
              onChange={handleStreetChange}
              defaultValue={allState.street}
            />
            <br></br>
            <br></br>
            <TextField
              required
              fullWidth
              error={cityError}
              helperText={cityError ? "*Required" : ""}
              label="City"
              variant="outlined"
              onChange={handleCityChange}
              defaultValue={allState.city}
            />
            <br></br>
            <br></br>
            <Autocomplete
              fullWidth
              options={states}
              getOptionLabel={(option) => option}
              onChange={handleStateChange}
              value={allState.state}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="State"
                  variant="outlined"
                />
              )}
            />
            {stateError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "0.3rem",
                  marginBottom: "-0.4rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required
              </p>
            ) : (
              ""
            )}
            <br></br>
            <TextField
              required
              fullWidth
              error={postalCodeError}
              helperText={postalCodeError ? "*Required" : ""}
              label="Postcode"
              variant="outlined"
              onChange={handlePostalCodeChange}
              defaultValue={allState.postalCode}
            />
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* Ways to make appointment */}
            <Box display="flex" mt={2} mb={3}>
              <Typography variant="h6" color="primary">
                Ways to Make Appointment
              </Typography>
            </Box>
            <FormControl component="fieldset" fullWidth>
              <Box display="flex" alignItems="center">
                {/* Call */}
                <Box mr={2} mt={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allState.call}
                        onChange={handleAppointmentChange}
                        name="call"
                      />
                    }
                    label="Call"
                  />
                </Box>
                <Box flexGrow={1}>
                  <TextField
                    disabled={!allState.call}
                    error={callNumError}
                    helperText={callNumError ? "*Required" : ""}
                    fullWidth
                    required
                    size="small"
                    label="Phone Number"
                    variant="outlined"
                    onChange={handleCallNumberChange}
                    defaultValue={allState.callNumber}
                  />
                </Box>
              </Box>
              {/* Online */}
              <Box display="flex" alignItems="center">
                <Box mt={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allState.online}
                        onChange={handleAppointmentChange}
                        name="online"
                      />
                    }
                    label="Online"
                  />
                </Box>
                <Box flexGrow={1} mt={2}>
                  <TextField
                    disabled={!allState.online}
                    error={onlineLinkError}
                    helperText={onlineLinkError ? "*Required" : ""}
                    fullWidth
                    required
                    size="small"
                    label="Link"
                    variant="outlined"
                    onChange={handleOnlineLinkChange}
                    defaultValue={allState.onlineLink}
                  />
                </Box>
              </Box>
              {/* Email */}
              <Box display="flex" alignItems="center">
                <Box mr={1} mt={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allState.email}
                        onChange={handleAppointmentChange}
                        name="email"
                      />
                    }
                    label="Email"
                  />{" "}
                </Box>
                <Box flexGrow={1} mt={2}>
                  <TextField
                    disabled={!allState.email}
                    error={emailAddressError}
                    helperText={emailAddressError ? "*Required" : ""}
                    fullWidth
                    required
                    size="small"
                    label="Email Address"
                    variant="outlined"
                    onChange={handleEmailAddressChange}
                    defaultValue={allState.emailAddress}
                  />
                </Box>
              </Box>
              {/* On site */}
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allState.onsite}
                      onChange={handleAppointmentChange}
                      name="onsite"
                    />
                  }
                  label="On site"
                />
              </Box>
            </FormControl>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Box display="flex" mt={2} mb={3}>
              <Typography variant="h6" color="primary">
                Expertise
              </Typography>
            </Box>
            {/* Specialty */}
            <Autocomplete
              fullWidth
              required
              options={specialties}
              onChange={handleSpecialtyChange}
              value={allState.specialty}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Specialty"
                  variant="outlined"
                />
              )}
            />
            {specialtyError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "0.3rem",
                  marginBottom: "-0.4rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required
              </p>
            ) : (
              ""
            )}
            <br></br>
            {/* Qualifications */}
            <TextField
              fullWidth
              required
              error={qualificationsError}
              helperText={qualificationsError ? "*Required" : ""}
              label="Qualifications"
              variant="outlined"
              onChange={handleQualificationsChange}
              defaultValue={allState.qualifications}
            />
            <br></br>
            <br></br>
            {/* Add procedure */}
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleAddProcButtonChange}
            >
              <TextField
                fullWidth
                id="procedure"
                label="Procedures"
                variant="outlined"
                required
                onChange={handleProcedureChange}
                helperText={"Press 'enter' key to add one procedure"}
              />
            </form>

            <div id="procTags">{procList}</div>
            {proceduresError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "0.3rem",
                  marginBottom: "-0.5rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required & alphabetical letters only
              </p>
            ) : (
              ""
            )}
            <br></br>
            {/* Add condition */}

            <form
              noValidate
              autoComplete="off"
              onSubmit={handleAddCondButtonChange}
            >
              <TextField
                fullWidth
                id="condition"
                label="Conditions"
                variant="outlined"
                required
                onChange={handleConditionChange}
                helperText={"Press 'enter' key to add one condition"}
              />
            </form>
            <div id="procTags">{condList}</div>
            {conditionsError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "0.3rem",
                  marginBottom: "-0.5rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required & alphabetical letters only
              </p>
            ) : (
              ""
            )}
            <br></br>
            {/* Languages */}
            <Autocomplete
              required
              value={allState.languages}
              onChange={handleLanguageChange}
              id="language-option"
              options={languageList}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Languages *" variant="outlined" />
              )}
            />

            <div id="procTags">{langList}</div>
            {languageError ? (
              <p
                style={{
                  color: "red",
                  marginTop: "0.2rem",
                  marginBottom: "-0.5rem",
                  marginLeft: "0.8rem",
                  fontSize: "0.75rem",
                }}
              >
                *Required
              </p>
            ) : (
              ""
            )}
            <br></br>
            <br></br>
            <br></br>
            <Button
              disabled={submitError}
              variant="contained"
              color="primary"
              style={{ textTransform: "none", float: "right" }}
              size="large"
              onClick={sendProfile}
            >
              Submit
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </Grid>
          <Grid item xs={1} md={3}></Grid>
        </Grid>
      </a>
    );
  }
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
  doctorData: state.user.doctorData,
  specialtyList: state.user.specialtyList,
  conditionsList: state.user.conditionsList,
});

const mapActionsToProps = {
  sendProfileToSpec,
  deleteProfileInSpec,
  sendAccountProfile,
  sendSpecList,
  sendCondList,
  publish,
  getSpecProfile,
  getSpecList,
  getCondList,
};

export default connect(mapStateToProps, mapActionsToProps)(DocEditProfile);

// ---------------  autocomplete lists (need to add more later) ---------------- //

const hospitals = [
  "Pantai Hospital Kuala Lumpur",
  "Hospital Kuala Lumpur",
  "Tung Shin Hospital",
  "University Malaya Medical Centre",
  "Prince Court Medical Centre",
];

const states = [
  "Kuala Lumpur",
  "Selangor",
  "Johor",
  "Melaka",
  "Negeri Sembilan",
  "Penang",
  "Perak",
  "Kelantan",
  "Terengganu",
  "Kedah",
  "Pulau Pinang",
  "Perlis",
  "Sabah",
  "Sarawak",
  "Labuan",
  "Putrajaya",
];

const specialties = [
  "General Surgery",
  "Cardiology",
  "Ophthalmology",
  "Gastroenterology",
  "Neurology",
  "Obstetrics & Gynecology",
  "Otorhinolaryngology",
  "Urology",
  "Paediatrics",
  "Orthopaedics",
  "Anaethesiology",
];

const languageList = ["English", "Malay", "Mandarin", "Tamil", "Cantonese"];
