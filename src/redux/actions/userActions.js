import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
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
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("FBIdToken");
  //remove from axios header
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
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

// 这一页只加了这个function 连着的是docAccountverification.js
export const updateVerification = (newVerification) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/verification", newVerification)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};




