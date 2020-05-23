import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,

    // 新加5/14
    GET_PROFILE,
    GET_SPECIALTY,
    GET_CONDITION,
} from "../types";
import axios from "axios";

//loginUser is used in Login.js
export const loginUser = (userData, history) => (dispatch) => {
  //send action with type LOADING_UI and catch the action in reducer
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userData)
    .then((res) => {
      //send request to server
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/`);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// used in GeneralSignup.js
export const signupGeneralUser = (newGeneralUserData, history) => (
  dispatch
) => {
  //send action with type LOADING_UI and catch the action in reducer
  dispatch({ type: LOADING_UI });
  axios
    .post("/generalsignup", newGeneralUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/`);
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

//used in DoctorSignup.js
export const signupDoctorUser = (newDoctorUserData, history) => (dispatch) => {
  //send action with type LOADING_UI and catch the action in reducer
  dispatch({ type: LOADING_UI });
  axios
    .post("/doctorsignup", newDoctorUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/`);
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      }
    });
};

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

// Used in UserMenu.js for logging out user
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  //remove from axios header
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  // history.push(`/`);
};

// used in App.js to fetch user data
export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER /* use in userReducer.js */,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// used in doctor DocAccountVerification.js
export const updateVerification = (newVerification) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/verification", newVerification)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in DocSideNav.js
export const changeProfilePic = (newProfilePic) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/profilepicture", newProfilePic)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in DocTags.js
export const updateUserStoredDocTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/useraddeddoctortags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in DocInfo.js
export const changeDocLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/userlikedoctor", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in DocInfo.js
export const changeDocSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/usersavedoctor", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in HospTags.js
export const updateUserStoredHospTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/useraddedhospitaltags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in HospInfo.js
export const changeHospLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/userlikehospital", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// used in HospInfo.js
export const changeHospSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/usersavehospital", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

// 加了send report
export const report = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/report", data).catch((err) => console.log(err));
};

// -------------------- ------------------------- //

// 新加5/14
// SEND

// DOCTOR填的PROFILE相关
// 加了send data to account in specialty
export const sendProfileToSpec = (specData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/profiletospec", specData)
    .then(() => {
      dispatch(getSpecProfile());
    })
    .catch((err) => console.log(err));
};

// 加了send data to user account profile
export const sendAccountProfile = (accountData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/accountprofile", accountData).catch((err) => console.log(err));
};

export const deleteProfileInSpec = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/deleteprofile", data).catch((err) => console.log(err));
};

// send specialty list to database
export const sendSpecList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/sendspeclist", data).catch((err) => console.log(err));
};

// send condition list to database
export const sendCondList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/sendcondlist", data).catch((err) => console.log(err));
};

// publish
export const publish = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/publish", data).catch((err) => console.log(err));
};

// -------------------- ------------------------- //

// 新加5/14
// GET

// DOCTOR填的PROFILE相关
// 加了get account data from specialty
export const getSpecProfile = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/getspecprofile")
    .then((res) => {
      console.log('load specprofile data!!')
      dispatch({
        type: GET_PROFILE /* use in userReducer.js */,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// 加了get specialty list
export const getSpecList = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/getspeclist")
    .then((res) => {
      dispatch({
        type: GET_SPECIALTY /* use in userReducer.js */,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// 加了get condition list
export const getCondList = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/getcondlist")
    .then((res) => {
      dispatch({
        type: GET_CONDITION /* use in userReducer.js */,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


// 加了send hospital report
export const reportHospital = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/reporthospital", data).catch((err) => console.log(err));
};

// send doctors reported to user account
export const sendReportedDoctors = (data) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/sendreporteddoctors", data).catch((err) => console.log(err));
  };

// send hospitals reported to user account
export const sendReportedHospitals = (data) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/sendreportedhospitals", data).catch((err) => console.log(err));
  };





