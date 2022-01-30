// 以后会用到
import { LOADING_USER, GET_HOSP_DATA, GET_SEARCH_DATA } from "../types";
import axios from "axios";

// send specialty list to database
export const sendSpecList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/updatespecialtylist", data).catch((err) => console.error(err));
};

// send condition list to database
export const sendCondList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/updateconditionlist", data).catch((err) => console.error(err));
};

// used in DocEditProfile.js
export const sendProfileToSpec = (specData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatepublicprofile", specData)
    .then(() => {
      dispatch(getSpecProfile());
    })
    .catch((err) => console.error(err));
};

export const deleteProfileInSpec = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/deleteoldprofile", data).catch((err) => console.error(err));
};

// publish
export const publish = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/publishprofile", data).catch((err) => console.error(err));
};

// used in DocTags.js
export const updateDoctorTags = (doctorTags) => () => {
  axios
    .post("/updatedoctortags", doctorTags)
    .catch((err) => console.error(err));
};

// used in DocTags.js
export const updateDoctorLikes = (likes) => () => {
  axios.post("/updatedoctorlikes", likes).catch((err) => console.error(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// used in HospTags.js
export const updateHospTags = (hospTags) => () => {
  axios
    .post("/updatehospitaltags", hospTags)
    .catch((err) => console.error(err));
};

// used in HospTags.js
export const updateHospitalLikes = (likes) => () => {
  axios.post("/updatehospitallikes", likes).catch((err) => console.error(err));
};

// used in DocSideNav.js
export const updateDoctorProfilePic = (imgSrc) => () => {
  axios
    .post("/updatedoctorprofilepic", imgSrc)
    .catch((err) => console.error(err));
};

// // send doctors reported to user account
// export const sendReportedDoctors = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/updatereporteddoctors", data).catch((err) => console.error(err));
// };

// // send hospitals reported to user account
// export const sendReportedHospitals = (data) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios.post("/updatereportedhospitals", data).catch((err) => console.error(err));
// };

// -------------------------------------------------------------------- //
// 新加 5/14
// 加了send report
export const reportDoctor = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/reportdoctor", data).catch((err) => console.error(err));
};

// 加了send hospital report
export const reportHospital = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post("/reporthospital", data).catch((err) => console.error(err));
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
    .catch((err) => console.error(err));
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
    .catch((err) => console.error(err));
};
