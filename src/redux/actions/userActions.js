import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// -------------Used in page Login.js and Signup.js

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const auth = getAuth();
  signInWithEmailAndPassword(auth, userData.email, userData.password)
    .then((userCredential) => {
      return userCredential.user.getIdToken();
    })
    .then((idToken) => {
      setAuthorizationHeader(idToken);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
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
              type: SET_USER,
              payload: res.data,
            });
          })
          .catch((err) => console.error(err));
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.code,
        });
      });
  };

//used in DoctorSignup.js
export const signupDoctorUser = (newDoctorUserData, history) => (dispatch) => {
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
            type: SET_USER,
            payload: res.data,
          });
        })
        .catch((err) => console.error(err));
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

// Used in UserMenu.js for logging out user
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  //remove from axios header
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (
    window.location.pathname === "/account" ||
    window.location.pathname === "/profile" ||
    window.location.pathname === "/saved" ||
    window.location.pathname === "/likehistory" ||
    window.location.pathname === "/accountverification"
  ) {
    window.location.replace("/login");
  }
};

// -------------Used in page DocProfile.js and HospProfile.js

// used in DocInfo.js
export const changeDocLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatelikeddoctors", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocInfo.js
export const changeDocSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatesaveddoctors", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in DocTags.js
export const updateUserStoredDocTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updateuserstoreddoctags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospInfo.js
export const changeHospLikeStatus = (newLikedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatelikedhospitals", newLikedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospInfo.js
export const changeHospSaveStatus = (newSavedList) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatesavedhospitals", newSavedList)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// used in HospTags.js
export const updateUserStoredHospTags = (userSelectedTags) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updateuserstoredhosptags", userSelectedTags)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// send doctors reported to user account, used in docInfo.js
export const sendReportedDoctors = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatereporteddoctors", data)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// send hospitals reported to user account, used in hospInfo.js
export const sendReportedHospitals = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updatereportedhospitals", data)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// -------------Used in page account.js

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/api/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

// used in DocSideNav.js
export const changeProfilePic = (newProfilePic) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updateprofilepic", newProfilePic)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// doctor user actions only
// used in DocAccountVerification.js
export const updateVerification = (newVerification) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updateverification", newVerification)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};

// send data to user account profile
export const sendAccountProfile = (accountData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/api/updateprofile", accountData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.error(err));
};
