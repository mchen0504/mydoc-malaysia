import React from "react";
import "./css/login.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { useState, useEffect } from "react";

// material ui theme
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";

import {
  logoutUser,
  getUserData,
  getSpecProfile,
  getSpecList,
  getCondList,
} from "./redux/actions/userActions";

import {
  getAllSearchData,
  getAllSearchDataHospital,
} from "./redux/actions/dataActions";

// pages
import Home from "./pages/Home";
import login from "./pages/Login";
import signup from "./pages/Signup";
import covid from "./pages/Covid";
import Results from "./pages/Results";
import Docprofile from "./pages/DocProfile";
import Hospprofile from "./pages/HospProfile";

//新加的 5/1/2020
import Hospspecialtyprofile from "./pages/HospSpecialtyProfile";
import Account from "./pages/Account";
import BodyPartsDialog from "./components/bodyparts/Body";
import Test from "./components/profile/Test";

// use themeFile from theme.js
const theme = createMuiTheme(themeFile);

// set up api
// axios.defaults.baseURL = "http://localhost:3008/";
// "https://cors-anywhere.herokuapp.com/https://us-central1-mydoc-f3cd9.cloudfunctions.net/api/";

// backend stuff
const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  // log user out when expire
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token; //deal with page refresh
    store.dispatch(getUserData());
  }
}

// store.dispatch(getSpecList());
// store.dispatch(getCondList());

function App() {
  const [docInfo, setDocInfo] = useState([]);
  const [hospitalInfo, sethospitalInfo] = useState([]);
  const [searchType, setSearchType] = useState("Specialty");
  const [searchValue, setSearchValue] = useState();
  const [docInfoCopy, setDocInfoCopy] = useState([]);
  const [hospitalInfoCopy, sethospitalInfoCopy] = useState([]);
  const [searchMethod, setSearchMethod] = React.useState("Specialty");
  const [keywords, setKeywords] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [searchBegin, setSearchBegin] = React.useState(false);
  const [hosType, setHosType] = React.useState("both");
  const [languageList, setLanguageList] = React.useState([]);
  const [yearOfPractice, setyearOfPractice] = React.useState([1000, -1]);
  const [filterlocation, setFilterlocation] = React.useState([]);
  const [filterBegin, setFilterBegin] = React.useState(false);
  const [targetDoc, setTargetDoc] = React.useState(null);
  const [targetHos, setTargetHos] = React.useState(null);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  // he chen Newest
  const [conditionListForInput, setConditionListForInput] = React.useState();
  const [specialtyListForInput, setSpecialtyListForInput] = React.useState();
  const [profileBackToDestination, setProfileBackToDestination] =
    React.useState();
  const [bodyPartsDic, setBodyPartsDic] = React.useState(null);
  const [drivingTime, setDrivingTime] = React.useState([1000, -1]);
  const [conditionLabel, setConditionLabel] = React.useState("");
  const [searchingState, setSearchingState] = React.useState("in-progress");
  const [database, setDatabase] = React.useState();
  const reportMax = 50;

  useEffect(() => {
    if (database == null) {
      axios.get("/alldata").then((res) => {
        setDatabase(res.data);
      });
    }

    if (conditionListForInput == null) {
      axios.get("/inputs").then((res) => {
        setConditionListForInput(res.data[0]);
        setSpecialtyListForInput(res.data[1]);
      });
    }

    if (location == "") {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        axios
          .get(proxyurl + "https://maps.googleapis.com/maps/api/geocode/json", {
            // .get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
              latlng: latitude + "," + longitude,
              key: "",
            },
          })
          .then((res) => {
            //  Assume you live in this area (Kuala Lumpur).
            setLocation(
              "Pantai Hospital Kuala Lumpur, Jalan Bukit Pantai, Bangsar, Kuala Lumpur, Federal Territory of Kuala Lumpur"
            );
          });
      });
    }

    if (bodyPartsDic == null) {
      axios
        .get("/bodyparts")
        .then((res) => {
          setBodyPartsDic(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  const getLocationValue = (value) => {
    setLocation(value);
  };

  const getKeyWords = (value) => {
    setKeywords(value);
  };

  // he chen newest
  const changeConditionLabel = (value, method) => {
    setKeywords(value);
    if (method == "body") {
      setConditionLabel(value);
    } else {
      setConditionLabel("");
    }
  };

  const getSearchMethod = (value) => {
    setSearchMethod(value);
    setKeywords("");
  };

  const startSearch = () => {
    setConditionLabel("");
    setSearchBegin(true);
  };

  const filterHosType = (type) => {
    setHosType(type);
    setFilterBegin(true);
  };

  const filterLanguageList = (lang) => {
    setLanguageList(lang);
    setFilterBegin(true);
  };

  // he chen newest
  const filterYear = (range) => {
    setyearOfPractice(range);
    setFilterBegin(true);
  };

  // he chen newest
  const filterDrivingTime = (range) => {
    setDrivingTime(range);
    setFilterBegin(true);
  };

  const updateTargetDoc = (doctor) => {
    setTargetDoc(doctor);
  };

  const updateTargetHos = (hospital) => {
    setTargetHos(hospital);
  };

  const renderHome = (renderProps) => {
    return (
      <Home
        {...renderProps}
        database={database}
        // currentLocation={location}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        // doMainSearch={doMainSearch}
        // getLocationValue={getLocationValue}
        // getKeyWords={getKeyWords}
        // startSearch={startSearch}
        // getSearchMethod={getSearchMethod}
        // searchMethod={searchMethod}
        // searchBegin={searchBegin}
        // setSearchMethod={setSearchMethod}
        // setKeywords={setKeywords}
        // changeConditionLabel={changeConditionLabel}
        conditionLabel={conditionLabel}
        // keywords={keywords}
        conditionListForInput={conditionListForInput}
        specialtyListForInput={specialtyListForInput}
        bodyPartsDic={bodyPartsDic}
        setConditionLabel={setConditionLabel}
      />
    );
  };
  const renderResults = (renderProps) => {
    return (
      <Results
        {...renderProps}
        database={database}
        conditionListForInput={conditionListForInput}
        specialtyListForInput={specialtyListForInput}
        // setDocInfo={setDocInfo}
        // sethospitalInfo={sethospitalInfo}
        // docInfo={docInfo}
        // hospitalInfo={hospitalInfo}
        // doMainSearch={doMainSearch}
        // getLocationValue={getLocationValue}
        // getKeyWords={getKeyWords}
        // startSearch={startSearch}
        // searchBegin={searchBegin}
        // setSearchMethod={setSearchMethod}
        // keywords={keywords}
        // setKeywords={setKeywords}
        // searchMethod={searchMethod}
        // getSearchMethod={getSearchMethod}
        // filterHosType={filterHosType}
        // filterLanguageList={filterLanguageList}
        // filterYear={filterYear}
        // filterDrivingTime={filterDrivingTime}
        // updateTargetDoc={updateTargetDoc}
        // updateTargetHos={updateTargetHos}
        // conditionListForInput={conditionListForInput}
        // specialtyListForInput={specialtyListForInput}
        profileBackToDestination={profileBackToDestination}
        setProfileBackToDestination={setProfileBackToDestination}
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        // searchingState={searchingState}
        // setyearOfPractice={setyearOfPractice}
        // setDrivingTime={setyearOfPractice}
      />
    );
  };

  const renderDocProfile = (renderProps) => {
    return (
      <Docprofile
        {...renderProps}
        database={database}
        setDatabase={setDatabase}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        docInfo={docInfo}
        hospitalInfo={hospitalInfo}
        // doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        getSearchMethod={getSearchMethod}
        targetDoc={targetDoc}
        conditionListForInput={conditionListForInput}
        specialtyListForInput={specialtyListForInput}
        profileBackToDestination={profileBackToDestination}
        setProfileBackToDestination={setProfileBackToDestination}
      />
    );
  };

  const renderHosProfile = (renderProps) => {
    return (
      <Hospprofile
        {...renderProps}
        database={database}
        setDatabase={setDatabase}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        docInfo={docInfo}
        hospitalInfo={hospitalInfo}
        // doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        getSearchMethod={getSearchMethod}
        updateTargetDoc={updateTargetDoc}
        targetHos={targetHos}
        profileBackToDestination={profileBackToDestination}
        setProfileBackToDestination={setProfileBackToDestination}
      />
    );
  };

  // michelle改的/加的
  const renderAccount = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={0}
      />
    );
  };

  const renderAccountEditProfile = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={1}
      />
    );
  };

  const renderSaved = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={2}
      />
    );
  };

  const renderLikeHistory = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={3}
      />
    );
  };

  const renderAccountVerification = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={4}
      />
    );
  };

  const renderAccountSettings = (renderProps) => {
    return (
      <Account
        {...renderProps}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        setProfileBackToDestination={setProfileBackToDestination}
        database={database}
        index={5}
      />
    );
  };

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <div className="container">
              <Route exact path="/" render={renderHome}></Route>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/covid19" component={covid}></Route>
              {/* <Route exact path="/results" render={renderResults}></Route> */}
              <Route
                exact
                path="/results/:searchby/:value"
                render={renderResults}
              ></Route>
              {/* <Route exact path="/docprofile" render={renderDocProfile}></Route> */}
              <Route
                exact
                path="/profile/:hospital/:specialty/:name"
                render={renderDocProfile}
              ></Route>
              {/* <Route
                exact
                path="/hospprofile"
                render={renderHosProfile}
              ></Route> */}
              <Route
                exact
                path="/profile/:hospital/:specialty"
                render={renderHosProfile}
              ></Route>

              {/*新加的 5/1/2020 */}
              <Route
                exact
                path="/hospspecialtyprofile"
                component={Hospspecialtyprofile}
              ></Route>

              {/* michelle改的/加的 */}
              <Route
                exact
                path="/account"
                render={renderAccount}
                index={0}
              ></Route>
              <Route
                exact
                path="/profile"
                render={renderAccountEditProfile}
                index={1}
              ></Route>
              <Route exact path="/saved" render={renderSaved} index={2}></Route>
              <Route
                exact
                path="/likehistory"
                render={renderLikeHistory}
                index={3}
              ></Route>
              <Route
                exact
                path="/accountverification"
                render={renderAccountVerification}
                index={4}
              ></Route>
              <Route
                exact
                path="/accountsettings"
                render={renderAccountSettings}
                index={5}
              ></Route>
            </div>
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
