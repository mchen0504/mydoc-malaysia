// 以后会用到
import { LOADING_USER, GET_HOSP_DATA, GET_SEARCH_DATA } from "../types";
import axios from "axios";

// used in DocTags.js
export const updateDoctorTags = (doctorTags) => (dispatch) => {
  axios.post("/updatedoctortags", doctorTags).catch((err) => console.log(err));
};

// used in DocTags.js
export const updateDoctorLikes = (likes) => (dispatch) => {
  axios.post("/updatedoctorlikes", likes).catch((err) => console.log(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// used in HospTags.js
export const updateHospTags = (hospTags) => (dispatch) => {
  axios.post("/updatehospitaltags", hospTags).catch((err) => console.log(err));
};

// used in HospTags.js
export const updateHospitalLikes = (likes) => (dispatch) => {
  axios.post("/updatehospitallikes", likes).catch((err) => console.log(err));
};

// michelle 5/16: 只加了这个function
// used in DocSideNav.js
export const updateDoctorProfilePic = (imgSrc) => (dispatch) => {
  axios
    .post("/updatedoctorprofilepic", imgSrc)
    .catch((err) => console.log(err));
};

// // send doctors reported to user account
// export const sendReportedDoctors = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/updatereporteddoctors", data).catch((err) => console.log(err));
// };

// // send hospitals reported to user account
// export const sendReportedHospitals = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/updatereportedhospitals", data).catch((err) => console.log(err));
// };

// -------------------------------------------------------------------- //
// 新加 5/14
// 加了send report
export const report = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/report", data).catch((err) => console.log(err));
};

// 加了send hospital report
export const reportHospital = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/reporthospital", data).catch((err) => console.log(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// below two functions are to be deleted once search function is done and profiles are changed dynamically

export const getAllSearchData = () => (dispatch) => {
  axios
    .get("/getallsearchdata")
    .then((res) => {
      dispatch({
        type: GET_SEARCH_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getAllSearchDataHospital = () => (dispatch) => {
  axios
    .get("/hospsearchinfo")
    .then((res) => {
      dispatch({
        type: GET_HOSP_DATA /* use in userReducer.js */,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
