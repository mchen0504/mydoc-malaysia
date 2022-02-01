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
import Covid from "./pages/Covid";
import Results from "./pages/Results";
import Docprofile from "./pages/DocProfile";
import Hospprofile from "./pages/HospProfile";
import Account from "./pages/Account";

// use themeFile from theme.js
const theme = createMuiTheme(themeFile);

// set up api
// axios.defaults.baseURL = "http://localhost:3008/";
// "https://cors-anywhere.herokuapp.com/https://us-central1-mydoc-f3cd9.cloudfunctions.net/api/";

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
  // const [location, setLocation] = useState("");
  // const [filterlocation, setFilterlocation] = useState([]);
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  // const [drivingTime, setDrivingTime] = useState([1000, -1]);
  const [conditionLabel, setConditionLabel] = useState("");

  // useEffect(() => {
  //   if (location == "") {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       let latitude = position.coords.latitude;
  //       let longitude = position.coords.longitude;
  //       axios
  //         .get(proxyurl + "https://maps.googleapis.com/maps/api/geocode/json", {
  //           // .get("https://maps.googleapis.com/maps/api/geocode/json", {
  //           params: {
  //             latlng: latitude + "," + longitude,
  //             key: "",
  //           },
  //         })
  //         .then((res) => {
  //           //  Assume you live in this area (Kuala Lumpur).
  //           setLocation(
  //             "Pantai Hospital Kuala Lumpur, Jalan Bukit Pantai, Bangsar, Kuala Lumpur, Federal Territory of Kuala Lumpur"
  //           );
  //         });
  //     });
  //   }
  // });

  // const getLocationValue = (value) => {
  //   setLocation(value);
  // };

  // const filterDrivingTime = (range) => {
  //   setDrivingTime(range);
  //   setFilterBegin(true);
  // }

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Switch>
            <div className="container">
              <Route exact path="/">
                <Home
                  conditionLabel={conditionLabel}
                  setConditionLabel={setConditionLabel}
                />
              </Route>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/covid19">
                <Covid />
              </Route>
              <Route exact path="/results/:searchby/:value">
                <Results />
              </Route>
              <Route exact path="/profile/:hospital/:specialty/:name">
                <Docprofile />
              </Route>
              <Route exact path="/profile/:hospital/:specialty">
                <Hospprofile />
              </Route>
              <Route exact path="/account">
                <Account index={0} />
              </Route>
              <Route exact path="/profile">
                <Account index={1} />
              </Route>
              <Route exact path="/saved">
                <Account index={2} />
              </Route>
              <Route exact path="/likehistory">
                <Account index={3} />
              </Route>
              <Route exact path="/accountverification">
                <Account index={4} />
              </Route>
            </div>
          </Switch>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
