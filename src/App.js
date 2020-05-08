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
import Docaccount from "./pages/DocAccount";


// use themeFile from theme.js
const theme = createMuiTheme(themeFile);

// set up api
axios.defaults.baseURL =
  "https://us-central1-mydoc-f3cd9.cloudfunctions.net/api/";

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
    store.dispatch(getUserData()); // get user data if logged in
  }
}

// set up material ui theme
// route to home/login/sign up
function App() {
  const [docInfo, setDocInfo] = useState([]);
  const [hospitalInfo, sethospitalInfo] = useState([]);
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
  const [componentDidMountIndicator, setComponentDidMount] = React.useState(0);
  const [conditionListForInput, setConditionListForInput] = React.useState(0);

  useEffect(() => {
    if(componentDidMountIndicator == 0){
      axios.get(proxyurl+'https://us-central1-mydoc-f3cd9.cloudfunctions.net/getSpecialty')
      .then((res)=>{
        setConditionListForInput(res.data);
      });
      setComponentDidMount(1);
    }
  });


  const getLocationValue = (value) => {
    setLocation(value);
  };

  const getKeyWords = (value) => {
    setKeywords(value);
  };

  const getSearchMethod = (value) => {
    setSearchMethod(value);
    setKeywords("");
  };

  const startSearch = () => {
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

  const filterYear = (range) => {
    setyearOfPractice(range);
    setFilterBegin(true);
  };

  const updateTargetDoc = (doctor) => {
    setTargetDoc(doctor);
  };

  const updateTargetHos = (hospital) => {
    setTargetHos(hospital);
  };

  const filterFunction = () => {
    let newDocList = [];
    let newHospitalList = [];
    docInfoCopy.forEach((doctor) => {
      let validateType =
        doctor["Type"].toLowerCase() == hosType.toLowerCase() ||
        hosType.toLowerCase() == "both";
      let validateLanguage =
        languageList.every(
          (element) => doctor["Language"].indexOf(element) > -1
        ) || languageList == [];
      let validateYear =
        (yearOfPractice[0] <= doctor["YearsofPractice"] &&
          yearOfPractice[1] >= doctor["YearsofPractice"]) ||
        yearOfPractice[0] == 1000;
      if (validateType && validateLanguage && validateYear) {
        newDocList.push(doctor);
      }
    });

    hospitalInfoCopy.forEach((hos) => {
      let validateType =
        hos["HospitalType"].toLowerCase() == hosType.toLowerCase() ||
        hosType.toLowerCase() == "both";
      let validateLanguage =
        languageList.every(
          (element) => hos["Language"].indexOf(element) > -1
        ) || languageList == [];
      if (validateType && validateLanguage) {
        newHospitalList.push(hos);
      }
    });
    setDocInfo(newDocList);
    sethospitalInfo(newHospitalList);
  };

  useEffect(() => {
    if (filterBegin) {
      filterFunction();
      return setFilterBegin(false);
    }
  });

  const doMainSearch = (pageProps) => {
    if (searchBegin) {
      let rootData = {
        Gastroenterology: 
          {
            Name: "Gastroenterology",
            Condition: ["Fever", "Headache"],
            Hospital: {
              PantaiHospitalKualaLumpur : {
                HospitalName: "Pantai Hospital Kuala Lumpur",
                HospitalType: "Private",
                Language: [
                  "English",
                  "Mandarin",
                  "Malay",
                  "Hokkien",
                  "Cantonese",
                ],
                likes: 10000000,
                RelateSpecialty: "Gastroenterology",
                Web: "https://www.pantai.com.my/kuala-lumpur",
                Hours: "24 hours",
                Address: "8, Jalan Bukit Pantai 59100 Kuala Lumpur",
                Zip: "92310",
                Phone: "+603-2296 0888",
                Tags: [
                  {
                    TagName: "Customer Service",
                    Number: 2,
                  },
                  {
                    TagName: "Facility",
                    Number: 3,
                  },
                  {
                    TagName: "Friendly",
                    Number: 5,
                  },
                ],
                Insurance: [
                  "Asia Assistance Network",
                  "AIA",
                  "AIA - Employee Benefit",
                  "AIA Datalink",
                ],
                TopSpecialty: [
                  {
                    SpecialtyName: "Gastroenterology",
                    Likes: 10,
                  },
                  {
                    SpecialtyName: "TestA",
                    Likes: 5,
                  },
                  {
                    SpecialtyName: "TestB",
                    Likes: 6,
                  },
                  {
                    SpecialtyName: "TestC",
                    Likes: 1,
                  },
                ],
                Doctors: {
                  AlexLeow1 : {
                    DocName: "Alex Leow1",
                    Specialty: "Gastroenterology",
                    Hospital: "Pantai Hospital Kuala Lumpur",
                    YearsofPractice: 7,
                    Address: "No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai 59100 Kuala Lumpur",
                    Phone: " +603-2296 0763 Ext. 1111",
                    Tags: [
                      {
                        TagName: "Bedside Manner",
                        Number: 1,
                      },
                      {
                        TagName: "Enthusiastic",
                        Number: 10,
                      },
                      {
                        TagName: "Friendly",
                        Number: 5,
                      },
                    ],
                    Appointment: {
                      Onsite: {
                        Content: "Onsite",
                        Status: "Active",
                      },
                      PhoneCall: {
                        Content: "206-123-4567",
                        Status: "",
                      },
                      Online: {
                        Content: "https://www.pantai.com.my/kuala-lumpur",
                        Status: "Active",
                      },
                      Email: {
                        Content: "chenh57@uw.edu",
                        Status: "Active",
                      },
                    },
                    Qualification:
                      "MMed (Mal), MB. BCh. BAO. (Hons) LRCPI & LRCSI (Ire), B. Biomed Sci. (Hons) (UM)",
                    Language: [
                      "English",
                      "Mandarin",
                      "Malay",
                      "Hokkien",
                      "Cantonese",
                    ],
                    Type: "Private",
                    Procedures: [
                      "Colonoscopy",
                      "Gastroscopy",
                      "Endoscopic Retrograde Cholangiopancreatography (ERCP)",
                      "Fibroscan",
                      "Liver Biopsy",
                      "Endoscopic Ultrasound (EUS)",
                      "Small Bowel Enteroscopy",
                      "Capsule Endoscopy",
                    ],
                    Conditions: [
                      "Helicobacter Pylori Infection",
                      "Dyspepsia",
                      "Gastro Esophageal Reflux Disease",
                      "Fever",
                    ],
                    NumberOfLikes: 12315
                  },
                  AlexLeow2 : {
                    DocName: "Alex Leow2",
                    Specialty: "Gastroenterology",
                    Hospital: "Pantai Hospital Kuala Lumpur",
                    YearsofPractice: 7,
                    Address:
                      "No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai 59100 Kuala Lumpur",
                    Phone: " +603-2296 0763 Ext. 1111",
                    Tags: [
                      {
                        TagName: "Bedside Manner",
                        Number: 1,
                      },
                      {
                        TagName: "Enthusiastic",
                        Number: 10,
                      },
                      {
                        TagName: "Friendly",
                        Number: 5,
                      },
                    ],
                    Appointment: {
                      Onsite: {
                        Content: "Onsite",
                        Status: "Active",
                      },
                      PhoneCall: {
                        Content: "206-123-4567",
                        Status: "",
                      },
                      Online: {
                        Content: "https://www.pantai.com.my/kuala-lumpur",
                        Status: "Active",
                      },
                      Email: {
                        Content: "chenh57@uw.edu",
                        Status: "Active",
                      },
                    },
                    Qualification:
                      "MMed (Mal), MB. BCh. BAO. (Hons) LRCPI & LRCSI (Ire), B. Biomed Sci. (Hons) (UM)",
                    Language: [
                      "English",
                      "Mandarin",
                      "Malay",
                      "Hokkien",
                      "Cantonese",
                    ],
                    Type: "Private",
                    Procedures: [
                      "Colonoscopy",
                      "Gastroscopy",
                      "Endoscopic Retrograde Cholangiopancreatography (ERCP)",
                      "Fibroscan",
                      "Liver Biopsy",
                      "Endoscopic Ultrasound (EUS)",
                      "Small Bowel Enteroscopy",
                      "Capsule Endoscopy",
                    ],
                    Conditions: [
                      "Helicobacter Pylori Infection",
                      "Dyspepsia",
                      "Gastro Esophageal Reflux Disease",
                      "Fever",
                    ],
                    NumberOfLikes: 12315
                  }
                }
              }
            }
          }
        };
      let userKeyWords = keywords.replace(" ", "").toLowerCase();
      let newDocData = [];
      let newHosData = [];
      
      getNewDocAndHospital(rootData, userKeyWords)
      .then((res)=>{
        newDocData = res.newDocData;
        newHosData = res.newHosData;
      }).then(()=>{
        sethospitalInfo(newHosData);
        setDocInfo(newDocData);
        sethospitalInfoCopy(newHosData);
        setDocInfoCopy(newDocData);
        if (pageProps.history != null) {
          pageProps.history.push("/results");
        }
      })
      .catch((error)=>{
        console.error(error);
      })      
    }

    return function resetSearchStatus() {
      setSearchBegin(false);
    };
  };


  let getNewDocAndHospital = async (rootData, userKeyWords) => {
    let newDocData = [];
    let newHosData = [];
    if(searchMethod == 'Specialty'){
      for (let specialty in rootData){
        if(specialty.replace(" ", "").toLowerCase() == userKeyWords){
          if (location == ''){
            for (let hospital in rootData[specialty]['Hospital']){
              let hospitalInfo = rootData[specialty]['Hospital'][hospital];
              newHosData.push(hospitalInfo);
              for (let doctor in hospitalInfo['Doctors'] ){
                newDocData.push(hospitalInfo['Doctors'][doctor]);
              }
            }
          } else {
            for (let hospital in rootData[specialty]['Hospital']){
              let hospitalInfo = rootData[specialty]['Hospital'][hospital];
              let potentialLocation = hospitalInfo.Address;
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
               }
              })
              let duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              if (duration <1.5){
                newHosData.push(hospitalInfo);
                for (let doctor in hospitalInfo['Doctors']){
                  newDocData.push(hospitalInfo['Doctors'][doctor]);
                }
              }
            }
          }
        }
      }
    } else if (searchMethod == "Doctor"){
      for (let specialty in rootData){
        for (let hos in rootData[specialty]['Hospital']){
          let potentialHos = rootData[specialty]['Hospital'][hos];
          if (location == ''){
            let docFound = 0;
            for (let doctor in potentialHos['Doctors']){
              let targetDoctor = potentialHos['Doctors'][doctor];
              if (targetDoctor['DocName'].replace(" ", "").toLowerCase().includes(userKeyWords.replace(" ", "").toLowerCase())){
                newDocData.push(targetDoctor);
                docFound ++;
              }
              if (docFound == 1){
                newHosData.push(potentialHos);
              }
            }
          } else {
            let potentialLocation = potentialHos.Address;
            let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
              params:{
                origins:location,
                destinations: potentialLocation,
                key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
              }
            });
            let duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
            if (duration <1.5){
              let docFound = 0;
              for (let doctor in potentialHos['Doctors']){
                let targetDoctor = potentialHos['Doctors'][doctor];
                if (targetDoctor['DocName'].replace(" ", "").toLowerCase().includes(userKeyWords.replace(" ", "").toLowerCase())){
                  newDocData.push(targetDoctor);
                  docFound ++;
                }
                if (docFound == 1){
                  newHosData.push(potentialHos);
                }
              }
            }
          }
        }
      }
    } else if (searchMethod == "Hospital"){
      for (let specialty in rootData){
        for (let hos in rootData[specialty]['Hospital']){
          let potentialHos = rootData[specialty]['Hospital'][hos];
          let locationMatch = true;
          let hosNameMacth = potentialHos['HospitalName'].replace(" ", "").toLowerCase() == userKeyWords;
          if (hosNameMacth){
            if (location != ''){
              let potentialLocation = potentialHos.Address;
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
                }
              });
              let duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              if (duration > 1.5){
                locationMatch = false;
              }
            }
            if(locationMatch){
              newHosData.push(potentialHos);
              for (let doctor in potentialHos['Doctors']){
                newDocData.push(potentialHos['Doctors'][doctor]);
              }
            }
          }
        }

      }
    } else {
      for (let specialty in rootData){
        let conditionList = rootData[specialty]['Condition'];
        conditionList = conditionList.map(function (item) {
                  return item.toLowerCase();
        });
        let locationMatch = true;
        let conditionMatch = conditionList.includes(userKeyWords);
        console.log(conditionMatch);
        if (conditionMatch){
          for (let hos in rootData[specialty]['Hospital']){
            let potentialHos = rootData[specialty]['Hospital'][hos];
            let potentialLocation = potentialHos.Address;
            console.log(potentialLocation);
              if (location != ''){
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
                }
              });
              let duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              if (duration > 1.5){
                locationMatch = false;
              }
            }
            if (locationMatch){
              newHosData.push(potentialHos);
              for (let doctor in potentialHos['Doctors']){
                let doctorCondition = potentialHos['Doctors'][doctor]['Conditions'];
                doctorCondition = doctorCondition.map(function (item) {
                  return item.toLowerCase();
                  });
                  if (doctorCondition.includes(userKeyWords)){
                  newDocData.push(potentialHos['Doctors'][doctor]);
                  }
              }
            }
          }
        }
      }
    }
    console.log(newDocData);
    console.log(newHosData);
    return {
      newDocData : newDocData,
      newHosData : newHosData
    }
  };


  const renderHome = (renderProps) => {
    return (
      <Home
        {...renderProps}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        startSearch={startSearch}
        getSearchMethod={getSearchMethod}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        conditionListForInput={conditionListForInput}
      />
    );
  };
  const renderResults = (renderProps) => {
    return (
      <Results
        {...renderProps}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        docInfo={docInfo}
        hospitalInfo={hospitalInfo}
        doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        startSearch={startSearch}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        getSearchMethod={getSearchMethod}
        filterHosType={filterHosType}
        filterLanguageList={filterLanguageList}
        filterYear={filterYear}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        conditionListForInput={conditionListForInput}
      />
    );
  };

  const renderDocProfile = (renderProps) => {
    return (
      <Docprofile
        {...renderProps}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        docInfo={docInfo}
        hospitalInfo={hospitalInfo}
        doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        startSearch={startSearch}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        getSearchMethod={getSearchMethod}
        targetDoc={targetDoc}
        conditionListForInput={conditionListForInput}
      />
    );
  };

  const renderHosProfile = (renderProps) => {
    return (
      <Hospprofile
        {...renderProps}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        docInfo={docInfo}
        hospitalInfo={hospitalInfo}
        doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        startSearch={startSearch}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        getSearchMethod={getSearchMethod}
        updateTargetDoc={updateTargetDoc}
        targetHos={targetHos}
      />
    );
  };




  // michelle改的/加的
  const renderDocAccount = (renderProps) => {
    return <Docaccount index={0} />;
  };

  const renderDocAccountEditProfile = (renderProps) => {
    return <Docaccount index={1} />;
  };

  const renderSaved = (renderProps) => {
    return <Docaccount index={2} />;
  };

  const renderLikeHistory = (renderProps) => {
    return <Docaccount index={3} />;
  };

  const renderDocAccountVerification = (renderProps) => {
    return <Docaccount index={4} />;
  };

  const renderAccountSettings = (renderProps) => {
    return <Docaccount index={5} />;
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
              <Route exact path="/results" render={renderResults}></Route>
              <Route exact path="/docprofile" render={renderDocProfile}></Route>
              <Route
                exact
                path="/hospprofile"
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
                path="/docaccount"
                render={renderDocAccount}
                index={0}
              ></Route>
              <Route
                exact
                path="/profile"
                render={renderDocAccountEditProfile}
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
                render={renderDocAccountVerification}
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
