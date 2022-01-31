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

import { logoutUser, getUserData } from "./redux/actions/userActions";

import { getData, getInputs } from "./redux/actions/dataActions";

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

store.dispatch(getData());
store.dispatch(getInputs());

function App() {
  const [docInfo, setDocInfo] = useState([]);
  const [hospitalInfo, sethospitalInfo] = useState([]);
  const [searchType, setSearchType] = useState("Specialty");
  const [searchValue, setSearchValue] = useState();
  const [searchMethod, setSearchMethod] = useState("Specialty");
  const [keywords, setKeywords] = useState("");
  const [location, setLocation] = useState("");
  const [searchBegin, setSearchBegin] = useState(false);
  // const [filterlocation, setFilterlocation] = useState([]);
  const [targetDoc, setTargetDoc] = useState(null);
  const [targetHos, setTargetHos] = useState(null);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const [profileBackToDestination, setProfileBackToDestination] = useState();
  // const [drivingTime, setDrivingTime] = useState([1000, -1]);
  const [conditionLabel, setConditionLabel] = useState("");
  const [database, setDatabase] = useState();

  useEffect(() => {
    // if (database == null) {
    //   axios.get("/alldata").then((res) => {
    //     setDatabase(res.data);
    //   });
    // }

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

  // const filterDrivingTime = (range) => {
  //   setDrivingTime(range);
  //   setFilterBegin(true);
  // };

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
        // setDocInfo={setDocInfo}
        // sethospitalInfo={sethospitalInfo}
        conditionLabel={conditionLabel}
        setConditionLabel={setConditionLabel}
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    );
  };
  const renderResults = (renderProps) => {
    return (
      <Results
        {...renderProps}
        // database={database}
        // profileBackToDestination={profileBackToDestination}
        // setProfileBackToDestination={setProfileBackToDestination}
        searchType={searchType}
        setSearchType={setSearchType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        // setDrivingTime={setyearOfPractice}
      />
    );
  };

  const renderDocProfile = (renderProps) => {
    return (
      <Docprofile
        {...renderProps}
        // database={database}
        // setDatabase={setDatabase}
        // setDocInfo={setDocInfo}
        // sethospitalInfo={sethospitalInfo}
        // docInfo={docInfo}
        // hospitalInfo={hospitalInfo}
        // getLocationValue={getLocationValue}
        // getKeyWords={getKeyWords}
        // searchBegin={searchBegin}
        // setSearchMethod={setSearchMethod}
        // setKeywords={setKeywords}
        // getSearchMethod={getSearchMethod}
        // targetDoc={targetDoc}
        // profileBackToDestination={profileBackToDestination}
        // setProfileBackToDestination={setProfileBackToDestination}
      />
    );
  };

  const renderHosProfile = (renderProps) => {
    return (
      <Hospprofile
        {...renderProps}
        // database={database}
        // setDatabase={setDatabase}
        // setDocInfo={setDocInfo}
        // sethospitalInfo={sethospitalInfo}
        // docInfo={docInfo}
        // hospitalInfo={hospitalInfo}
        // doMainSearch={doMainSearch}
        // getLocationValue={getLocationValue}
        // getKeyWords={getKeyWords}
        // searchBegin={searchBegin}
        // setSearchMethod={setSearchMethod}
        // setKeywords={setKeywords}
        // getSearchMethod={getSearchMethod}
        // updateTargetDoc={updateTargetDoc}
        // targetHos={targetHos}
        // profileBackToDestination={profileBackToDestination}
        // setProfileBackToDestination={setProfileBackToDestination}
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
