import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  GET_PROFILE,
  GET_SPECIALTY,
  GET_CONDITION,
} from "../types";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//loginUser is used in Login.js
export const loginUser = (userData, history) => (dispatch) => {
  //send action with type LOADING_UI and catch the action in reducer
  dispatch({ type: LOADING_UI });

  const auth = getAuth();
  signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      return userCredential.user.getIdToken();
    })
    .then((idToken) => {
      console.error(idToken);
      setAuthorizationHeader(idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/`);
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.code,
      });
    });
};

// used in GeneralSignup.js
export const signupGeneralUser =
  (newGeneralUserData, history) => (dispatch) => {
    //send action with type LOADING_UI and catch the action in reducer
    dispatch({ type: LOADING_UI });
    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      newGeneralUserData.email,
      newGeneralUserData.password
    )
      .then((data) => {
        newGeneralUserData.userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        setAuthorizationHeader(idToken);
        axios
          .post("/createdbgeneraluser", newGeneralUserData)
          .then((res) => {
            dispatch({
              type: SET_USER /* use in userReducer.js */,
              payload: res.data,
            });
          })
          .catch((err) => console.error(err));
        dispatch({ type: CLEAR_ERRORS });
        history.push(`/`);
      })
      .catch((err) => {
        // console.error(err);
        // if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.code,
        });
        // }
      });
  };

//used in DoctorSignup.js
export const signupDoctorUser = (newDoctorUserData, history) => (dispatch) => {
  //send action with type LOADING_UI and catch the action in reducer
  dispatch({ type: LOADING_UI });
  const auth = getAuth();
  createUserWithEmailAndPassword(
    auth,
    newDoctorUserData.email,
    newDoctorUserData.password
  )
    .then((data) => {
      newDoctorUserData.userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      setAuthorizationHeader(idToken);
      axios
        .post("/createdbdoctoruser", newDoctorUserData)
        .then((res) => {
          dispatch({
            type: SET_USER /* use in userReducer.js */,
            payload: res.data,
          });
        })
        .catch((err) => console.error(err));
      dispatch({ type: CLEAR_ERRORS });
      history.push(`/`);
    })
    .catch((err) => {
      // if (err.response) {
      dispatch({
        type: SET_ERRORS,
        payload: err.code,
      });
      // }
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
  if (
    window.location.pathname == "/account" ||
    window.location.pathname == "/profile" ||
    window.location.pathname == "/saved" ||
    window.location.pathname == "/likehistory" ||
    window.location.pathname == "/accountverification"
  ) {
    window.location.replace("/login");
  }
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
    .catch((err) => console.error(err));
};

// used in doctor DocAccountVerification.js
export const updateVerification = (newVerification) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updateverification", newVerification)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocSideNav.js
export const changeProfilePic = (newProfilePic) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updateprofilepic", newProfilePic)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocTags.js
export const updateUserStoredDocTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updateuserstoreddoctags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocInfo.js
export const changeDocLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatelikeddoctors", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocInfo.js
export const changeDocSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatesaveddoctors", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospTags.js
export const updateUserStoredHospTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updateuserstoredhosptags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospInfo.js
export const changeHospLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatelikedhospitals", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospInfo.js
export const changeHospSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatesavedhospitals", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// // DocInfo.js
// export const reportDoctor = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/reportdoctor", data).catch((err) => console.error(err));
// };

// // hosInfo.js
// export const reportHospital = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/reporthospital", data).catch((err) => console.error(err));
// };

// send doctors reported to user account, used in docInfo.js
export const sendReportedDoctors = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/updatereporteddoctors", data).catch((err) => console.error(err));
};

// send hospitals reported to user account, used in hospInfo.js
export const sendReportedHospitals = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatereportedhospitals", data)
    .catch((err) => console.error(err));
};

// doctor action
// send data to user account profile
export const sendAccountProfile = (accountData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/updateprofile", accountData).catch((err) => console.error(err));
};

// DOCTOR填的PROFILE相关
// 加了get account data from specialty
// export const getSpecProfile = () => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .get("/profile")
//     .then((res) => {
//       console.error(res.data);
//       dispatch({
//         type: GET_PROFILE /* use in userReducer.js */,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.error(err));
// };

// 加了get specialty list
// export const getSpecList = () => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .get("/specialtylist")
//     .then((res) => {
//       dispatch({
//         type: GET_SPECIALTY /* use in userReducer.js */,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.error(err));
// };

// 加了get condition list
// export const getCondList = () => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .get("/conditionlist")
//     .then((res) => {
//       dispatch({
//         type: GET_CONDITION /* use in userReducer.js */,
//         payload: res.data,
//       });
//     })
//     .catch((err) => console.error(err));
// };
