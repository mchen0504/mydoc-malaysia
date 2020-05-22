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
import { logoutUser, getUserData, getSpecProfile, getSpecList, getCondList } from "./redux/actions/userActions";

import { getAllSearchData,  getAllSearchDataHospital } from "./redux/actions/dataActions";


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
import Axios from "axios";

// use themeFile from theme.js
const theme = createMuiTheme(themeFile);


// set up api
axios.defaults.baseURL =
  "https://cors-anywhere.herokuapp.com/https://us-central1-mydoc-f3cd9.cloudfunctions.net/api/";

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
    store.dispatch(getSpecProfile());
  }
}


// 加了这两句 （michelle)   5/14/20  search function写完之后我profile改一下variable就可以删了
store.dispatch(getAllSearchData());
store.dispatch(getAllSearchDataHospital());

// get info from "inputList" collection for account profile display
store.dispatch(getSpecList());
store.dispatch(getCondList());


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
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  // he chen Newest
  const [conditionListForInput, setConditionListForInput] = React.useState();
  const [specialtyListForInput, setSpecialtyListForInput] = React.useState();
  const [profileBackToDestination, setProfileBackToDestination] = React.useState();
  const [bodyPartsDic, setBodyPartsDic] = React.useState(null);
  const [drivingTime, setDrivingTime] = React.useState([1000, -1]);
  const [conditionLabel, setConditionLabel] = React.useState("");
  const [searchingState, setSearchingState] = React.useState("in-progress");
  const [database, setDatabase] = React.useState();
  useEffect(() => {
    console.log('hi: data is staring ');

    if (database == null){
      console.log('database is loading');
      axios.get(proxyurl+'https://us-central1-mydoc-f3cd9.cloudfunctions.net/apiForSearch/getDatabase')
      .then((res)=>{
          setDatabase(res.data);
          console.log('database parts has been initialled');
        })
    }

    if(conditionListForInput == null){
      console.log('Download input list');
      axios.get(proxyurl+'https://us-central1-mydoc-f3cd9.cloudfunctions.net/apiForSearch/getAllInputs')
      .then((res)=>{
        setConditionListForInput(res.data[0]);
        setSpecialtyListForInput(res.data[1]);
        console.log('input list has been initialled');
      })
    }
    
    if(location == ''){
      console.log('Find location');
      navigator.geolocation.getCurrentPosition(function(position) {
        let latitude;
        let longitude;
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        axios.get(proxyurl+'https://maps.googleapis.com/maps/api/geocode/json', {
          params:{
            latlng:latitude+','+ longitude,
            key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
         }
        }).then((res)=>{
          console.log('finished location loading');
          setLocation(res.data.results[0].formatted_address);
        })
        
      })
   }

    if (bodyPartsDic == null){
      console.log('bodyParts is loading');
      axios.get(proxyurl+'https://us-central1-mydoc-f3cd9.cloudfunctions.net/apiForSearch/getBodyDic')
      .then((res)=>{
          setBodyPartsDic(res.data);
          console.log('body parts  has been initialled');
        })
    }

},[]);

  const getLocationValue = (value) => {
    setLocation(value);
  };

  const getKeyWords = (value) => {
    setKeywords(value);
  };

  // he chen newest
  const changeConditionLabel = (value, method) => {
    setKeywords(value);
    if(method=='body'){
      setConditionLabel(value);
    } else {
      setConditionLabel('');
    }
  }

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
        console.log(doctor);  
      let validateYear =
        (yearOfPractice[0] <= doctor["YearsofPractice"] &&
          yearOfPractice[1] >= doctor["YearsofPractice"]) ||
        yearOfPractice[0] == 1000;
      if (validateType && validateLanguage && validateYear) {
        newDocList.push(doctor);
      }
    });

    // he chen newest
    hospitalInfoCopy.forEach((hos) => {
      let validateType =
        hos["type"].toLowerCase() == hosType.toLowerCase() ||
        hosType.toLowerCase() == "both";
      let validateLanguage =
        languageList.every(
          (element) => hos["Language"].indexOf(element) > -1
        ) || languageList == [];

      let validateDrivingTime = hos['timeOfDriving'] >= drivingTime[0] && hos['timeOfDriving'] <= drivingTime[1] 
                                || drivingTime[0] == 1000;
      if (validateType && validateLanguage && validateDrivingTime) {
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

  // he chen
  const doMainSearch = (pageProps) => {

    if (hospitalInfo.length != 0 || docInfo.lenghth != 0){
      sethospitalInfo([]);
      setDocInfo([]);
      sethospitalInfoCopy([]);
      setDocInfoCopy([]);
      setSearchingState('in-progress')
    }

    if (pageProps.history != null) {
      pageProps.history.push("/results");
    }

    if (searchBegin) {
      // let rootData = {
      //   Gastroenterology: 
      //     {
      //       name: "Gastroenterology",
      //       conditions: ["Fever", "Headache"],
      //       hospital: {
      //         PantaiHospitalKualaLumpur : {
      //           name: "Pantai Hospital Kuala Lumpur",
      //           type: "Private",
      //           languages: [
      //             "English",
      //             "Mandarin",
      //             "Malay",
      //             "Hokkien",
      //             "Cantonese",
      //           ],
      //           likes: 10000000,
      //           relateSpecialty: "Gastroenterology",
      //           website: "https://www.pantai.com.my/kuala-lumpur",
      //           Hours: "24 hours",
      //           address: "8, Jalan Bukit Pantai 59100 Kuala Lumpur",
      //           phone: "+603-2296 0888",
      //           tags: [
      //             {
      //               tagName: "Customer Service",
      //               count: 2,
      //             },
      //             {
      //               tagName: "Facility",
      //               count: 3,
      //             },
      //             {
      //               tagName: "Friendly",
      //               count: 5,
      //             },
      //           ],
      //           insurance: [
      //             "Asia Assistance Network",
      //             "AIA",
      //             "AIA - Employee Benefit",
      //             "AIA Datalink",
      //           ],
      //           doctors: {
      //             AlexLeow1 : {
      //               name: "Alex Leow",
      //               specialty: "Gastroenterology",
      //               hospital: "Pantai Hospital Kuala Lumpur",
      //               imgAddress:"../../img/results/docAlex.png" ,
      //               yearsofPractice: 7,
      //               address: "No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai 59100 Kuala Lumpur",
      //               phone: " +603-2296 0763 Ext. 1111",
      //               tags: [
      //                 {
      //                   tagName: "Bedside Manner",
      //                   count: 1,
      //                 },
      //                 {
      //                   tagName: "Enthusiastic",
      //                   count: 10,
      //                 },
      //                 {
      //                   tagName: "Friendly",
      //                   count: 5,
      //                 },
      //               ],
      //               appointment: {
      //                 onsite: {
      //                   content: "Onsite",
      //                   status: true,
      //                 },
      //                 phoneCall: {
      //                   content: "206-123-4567",
      //                   status: true,
      //                 },
      //                 online: {
      //                   content: "https://www.pantai.com.my/kuala-lumpur",
      //                   status: true,
      //                 },
      //                 email: {
      //                   content: "chenh57@uw.edu",
      //                   status: true,
      //                 },
      //               },
      //               qualification:
      //                 "MMed (Mal), MB. BCh. BAO. (Hons) LRCPI & LRCSI (Ire), B. Biomed Sci. (Hons) (UM)",
      //               languages: [
      //                 "English",
      //                 "Mandarin",
      //                 "Malay",
      //                 "Hokkien",
      //                 "Cantonese",
      //               ],
      //               type: "Private",
      //               procedures: [
      //                 "Colonoscopy",
      //                 "Gastroscopy",
      //                 "Endoscopic Retrograde Cholangiopancreatography (ERCP)",
      //                 "Fibroscan",
      //                 "Liver Biopsy",
      //                 "Endoscopic Ultrasound (EUS)",
      //                 "Small Bowel Enteroscopy",
      //                 "Capsule Endoscopy",
      //               ],
      //               conditions: [
      //                 "Helicobacter Pylori Infection",
      //                 "Dyspepsia",
      //                 "Gastro Esophageal Reflux Disease",
      //                 "Fever",
      //               ],
      //               likes: 12
      //             },
      //             Lisa : {
      //               name: "Lisa wang",
      //               specialty: "Gastroenterology",
      //               hospital: "Pantai Hospital Kuala Lumpur",
      //               imgAddress:"../../img/results/docAlex.png" ,
      //               yearsofPractice: 7,
      //               address: "No. A103a - Endoscopy Centre, 1st Floor, Block A, 8, Jalan Bukit Pantai 59100 Kuala Lumpur",
      //               phone: " +603-2296 0763",
      //               tags: [
      //                 {
      //                   tagName: "Bedside Manner",
      //                   count: 1,
      //                 },
      //                 {
      //                   tagName: "Enthusiastic",
      //                   count: 10,
      //                 },
      //                 {
      //                   tagName: "Friendly",
      //                   count: 5,
      //                 },
      //               ],
      //               appointment: {
      //                 onsite: {
      //                   content: "Onsite",
      //                   status: true,
      //                 },
      //                 phoneCall: {
      //                   content: "206-123-4567",
      //                   status: false,
      //                 },
      //                 online: {
      //                   content: "https://www.pantai.com.my/kuala-lumpur",
      //                   status: true,
      //                 },
      //                 email: {
      //                   content: "chenh57@uw.edu",
      //                   status: false,
      //                 },
      //               },
      //               qualification:
      //                 "MMed (Mal), MB. BCh. BAO. (Hons) LRCPI & LRCSI (Ire), B. Biomed Sci. (Hons) (UM)",
      //               languages: [
      //                 "English",
      //                 "Cantonese",
      //               ],
      //               type: "Private",
      //               procedures: [
      //                 "Colonoscopy",
      //                 "Capsule Endoscopy"
      //               ],
      //               conditions: [
      //                 "Helicobacter Pylori Infection",
      //                 "Gastro Esophageal Reflux Disease",
      //                 "Fever"
      //               ],
      //               likes: 120
      //             }
      //           }
      //         }
      //       }
      //     }
      //   };
      let rootData = database;
      console.log(rootData);
      let userKeyWords = keywords.replace(/\s/g,'').toLowerCase();
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
        setSearchingState('finished');
      })
      .catch((error)=>{
        console.error(error);
      })      
    }

    return function resetSearchStatus() {
      setSearchBegin(false);
    };
  };

// he chen newest
  let getNewDocAndHospital = async (rootData, userKeyWords) => {
    console.log('search begin');
    console.log(rootData);
    let newDocData = [];
    let newHosData = [];
    if(searchMethod == 'Specialty'){
      for (let specialty in rootData){
        if(specialty.replace(/\s/g,'').toLowerCase() == userKeyWords){
          console.log(1);
          if (location == ''){
            for (let hospital in rootData[specialty]['hospitals']){
              let hospitalInfo = rootData[specialty]['hospitals'][hospital];
              newHosData.push(hospitalInfo);
              for (let doctor in hospitalInfo['doctors'] ){
                hospitalInfo['doctors'][doctor]['userName'] = doctor;
                newDocData.push(hospitalInfo['doctors'][doctor]);
              }
            }
          } else {
            console.log(2);
            for (let hospital in rootData[specialty]['hospitals']){
              let hospitalInfo = rootData[specialty]['hospitals'][hospital];
              let potentialLocation = hospitalInfo.address;
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
               }
              })
              let duration;
              if (distanceInfo.data.rows[0].elements.length > 0 && distanceInfo.data.rows[0].elements[0].status == 'OK'){
                duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              } else {
                duration = -1;
              }
              if (duration <1.5 && duration >= 0){
                hospitalInfo.timeOfDriving = duration;
                newHosData.push(hospitalInfo);
                for (let doctor in hospitalInfo['doctors']){
                  hospitalInfo['doctors'][doctor]['userName'] = doctor;
                  hospitalInfo['doctors'][doctor]['timeOfDriving'] = duration;
                  newDocData.push(hospitalInfo['doctors'][doctor]);
                }
              }
            }
          }
        }
      }
    } else if (searchMethod == "Doctor"){
      for (let specialty in rootData){
        for (let hos in rootData[specialty]['hospitals']){
          let potentialHos = rootData[specialty]['hospitals'][hos];
          if (location == ''){
            let docFound = 0;
            for (let doctor in potentialHos['doctors']){
              let targetDoctor = potentialHos['doctors'][doctor];
              if (targetDoctor['name'].replace(/\s/g,'').toLowerCase().includes(userKeyWords.replace(/\s/g,'').toLowerCase())){
                targetDoctor['userName'] = doctor;
                newDocData.push(targetDoctor);
                docFound ++;
              }
              if (docFound == 1){
                newHosData.push(potentialHos);
              }
            }
          } else {
            let potentialLocation = potentialHos.address;
            let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
              params:{
                origins:location,
                destinations: potentialLocation,
                key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
              }
            });
            let duration
            if (distanceInfo.data.rows[0].elements.length > 0 && distanceInfo.data.rows[0].elements[0].status == 'OK'){
              duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
            } else {
              duration = -1;
            }
            if (duration <1.5 && duration >= 0){
              let docFound = 0;
              for (let doctor in potentialHos['doctors']){
                let targetDoctor = potentialHos['doctors'][doctor];
                if (targetDoctor['name'].replace(/\s/g,'').toLowerCase().includes(userKeyWords.replace(/\s/g,'').toLowerCase())){
                  targetDoctor['userName'] = doctor;
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
        for (let hos in rootData[specialty]['hospitals']){
          let potentialHos = rootData[specialty]['hospitals'][hos];
          let locationMatch = true;
          let hosNameMacth = potentialHos['name'].replace(/\s/g,'').toLowerCase().includes(userKeyWords);
          if (hosNameMacth){
            if (location != ''){
              let potentialLocation = potentialHos.address;
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
                }
              });
              let duration
              if (distanceInfo.data.rows[0].elements.length > 0 && distanceInfo.data.rows[0].elements[0].status == 'OK'){
                duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              } else {
                duration = -1;
              }
              console.log(duration);
              if (duration > 1.5 || duration <= 0){
                locationMatch = false;
              }
            }
            if(locationMatch){
              newHosData.push(potentialHos);
              for (let doctor in potentialHos['doctors']){
                potentialHos['doctors'][doctor]['userName'] = doctor;
                newDocData.push(potentialHos['doctors'][doctor]);
              }
            }
          }
        }

      }
    } else {
      for (let specialty in rootData){
        let conditionList = rootData[specialty]['conditions'];
        conditionList = conditionList.map(function (item) {
                  return item.toLowerCase();
        });
        let locationMatch = true;
        let conditionMatch = conditionList.includes(userKeyWords);
        if (conditionMatch){
          for (let hos in rootData[specialty]['hospitals']){
            let potentialHos = rootData[specialty]['hospitals'][hos];
            let potentialLocation = potentialHos.address;
              if (location != ''){
              let distanceInfo = await axios.get(proxyurl+'https://maps.googleapis.com/maps/api/distancematrix/json', {
                params:{
                  origins:location,
                  destinations: potentialLocation,
                  key:'AIzaSyDHEaLdiFVUAJGJUW9fqq_VhOhBL4FzebQ'
                }
              });
              let duration
              if (distanceInfo.data.rows[0].elements.length > 0 && distanceInfo.data.rows[0].elements[0].status == 'OK'){
                duration = await distanceInfo.data.rows[0].elements[0].duration.value / 3600;
              } else {
                duration = -1;
              }
              if (duration > 1.5 || duration <= 0){
                locationMatch = false;
              }
            }
            if (locationMatch){
              newHosData.push(potentialHos);
              for (let doctor in potentialHos['doctors']){
                let doctorCondition = potentialHos['doctors'][doctor]['conditions'];
                doctorCondition = doctorCondition.map(function (item) {
                  return item.toLowerCase();
                  });
                  if (doctorCondition.includes(userKeyWords)){
                    potentialHos['doctors'][doctor]['userName'] = doctor;
                    newDocData.push(potentialHos['doctors'][doctor]);
                  }
              }
            }
          }
        }
      }
    }

    newHosData.forEach((hos)=>{
      hos["Address"] = hos.address;
      hos["HospitalType"] = hos.type;
      hos['Insurance'] = hos.insurance;
      hos['Language'] = hos.languages;
      hos['Phone'] = hos.phone;
      hos['HospitalName'] = hos.name;
      hos['RelateSpecialty'] = hos.relatedSpecialty;
      hos['Tags'] = hos.tags;
      hos['Web'] = hos.website;
      let conditionList = [];
      for (let doctor in hos['doctors']){
        let targetDoc = hos['doctors'][doctor];
        targetDoc.conditions = targetDoc.conditions.map((item)=>{
          let newItem = item.toLowerCase();
            newItem = newItem.replace(newItem[0],newItem[0].toUpperCase())
          return newItem
        });
        targetDoc.conditions.forEach((condition) => {
          if (conditionList.indexOf(condition) == -1){
            conditionList.push(condition)
          }
        });
      }
      hos['Conditions'] = conditionList;
    });

    newDocData.forEach((doc)=>{
      doc["Address"] = doc.address;
      doc["Language"] = doc.languages;
      doc['Phone'] = doc.phone;
      doc['Hospital'] = doc.hospital;
      doc['Conditions'] = doc.conditions;
      doc['DocName'] = doc.name;
      doc['Specialty'] = doc.specialty;
      doc['YearsofPractice'] = doc.yearsOfPractice;
      doc['Procedures'] = doc.procedures;
      doc['NumberOfLikes'] = doc.likes;
      doc['Qualifications'] = doc.qualifications;
      doc['Type'] = doc.type
    });

    console.log({
      newDocData : newDocData,
      newHosData : newHosData
    });
    return {
      newDocData : newDocData,
      newHosData : newHosData
    }
  };


  const renderHome = (renderProps) => {
    return (
      <Home
        {...renderProps}
        database = {database}
        currentLocation={location}
        setDocInfo={setDocInfo}
        sethospitalInfo={sethospitalInfo}
        doMainSearch={doMainSearch}
        getLocationValue={getLocationValue}
        getKeyWords={getKeyWords}
        startSearch={startSearch}
        getSearchMethod={getSearchMethod}
        searchMethod={searchMethod}
        searchBegin={searchBegin}
        setSearchMethod={setSearchMethod}
        setKeywords={setKeywords}
        changeConditionLabel={changeConditionLabel}
        conditionLabel={conditionLabel}
        keywords={keywords}
        conditionListForInput={conditionListForInput}
        specialtyListForInput={specialtyListForInput}
        bodyPartsDic={bodyPartsDic}
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
        keywords = {keywords}
        setKeywords={setKeywords}
        searchMethod={searchMethod}
        getSearchMethod={getSearchMethod}
        filterHosType={filterHosType}
        filterLanguageList={filterLanguageList}
        filterYear={filterYear}
        filterDrivingTime={filterDrivingTime}
        updateTargetDoc={updateTargetDoc}
        updateTargetHos={updateTargetHos}
        conditionListForInput={conditionListForInput}
        specialtyListForInput={specialtyListForInput}
        profileBackToDestination={profileBackToDestination}
        setProfileBackToDestination={setProfileBackToDestination}
        searchingState={searchingState}
      />
    );
  };

  const renderDocProfile = (renderProps) => {
    return (
      <Docprofile
        {...renderProps}
        database = {database}
        setDatabase = {setDatabase}
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
        database = {database}
        setDatabase = {setDatabase}
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
        profileBackToDestination={profileBackToDestination}
        setProfileBackToDestination={setProfileBackToDestination}
      />
    );
  };




  // michelle改的/加的
  const renderAccount = (renderProps) => {
    return <Account 
          {...renderProps}
          setDocInfo={setDocInfo}
          sethospitalInfo={sethospitalInfo}
          setProfileBackToDestination={setProfileBackToDestination} 
          database = {database} 
          index={0} 
    />;
  };

  const renderAccountEditProfile = (renderProps) => {
    return <Account
            {...renderProps}
            updateTargetDoc={updateTargetDoc}
            updateTargetHos={updateTargetHos}
            setProfileBackToDestination={setProfileBackToDestination} 
            database = {database} 
            index={1} 
            />;
  };

  const renderSaved = (renderProps) => {
    return <Account 
            {...renderProps}
            updateTargetDoc={updateTargetDoc}
            updateTargetHos={updateTargetHos}
            setProfileBackToDestination={setProfileBackToDestination} 
            database = {database} 
            index={2} 
            />;
  };

  const renderLikeHistory = (renderProps) => {
    return <Account 
            {...renderProps}
            updateTargetDoc={updateTargetDoc}
            updateTargetHos={updateTargetHos}
            setProfileBackToDestination={setProfileBackToDestination}  
            database = {database}  
            index={3} 
            />;
  };

  const renderAccountVerification = (renderProps) => {
    return <Account 
            {...renderProps}
            updateTargetDoc={updateTargetDoc}
            updateTargetHos={updateTargetHos}
            setProfileBackToDestination={setProfileBackToDestination} 
            database = {database} 
            index={4} 
            />;
  };

  const renderAccountSettings = (renderProps) => {
    return <Account 
            {...renderProps}
            updateTargetDoc={updateTargetDoc}
            updateTargetHos={updateTargetHos}
            setProfileBackToDestination={setProfileBackToDestination} 
            database = {database} 
            index={5} 
            />;
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
