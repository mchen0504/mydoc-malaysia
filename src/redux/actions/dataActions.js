import { LOADING_USER, GET_SEARCH_DATA, GET_INPUT_LIST } from "../types";
import axios from "axios";

export const sendSpecList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatespecialtylist", data)
    .then(() => {
      dispatch(getInputs());
    })
    .catch((err) => console.error(err));
};

export const sendCondList = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updateconditionlist", data)
    .then(() => {
      dispatch(getInputs());
    })
    .catch((err) => console.error(err));
};

// used in DocEditProfile.js
export const sendProfileToSpec = (specData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/updatepublicprofile", specData)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

export const deleteProfileInSpec = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/deleteoldprofile", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// publish
export const publish = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/publishprofile", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in DocTags.js
export const updateDoctorTags = (doctorTags) => (dispatch) => {
  axios
    .post("/updatedoctortags", doctorTags)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in DocInfo.js
export const updateDoctorLikes = (likes) => (dispatch) => {
  axios
    .post("/updatedoctorlikes", likes)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in HospTags.js
export const updateHospTags = (hospTags) => (dispatch) => {
  axios
    .post("/updatehospitaltags", hospTags)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in HospInfo.js
export const updateHospitalLikes = (likes) => (dispatch) => {
  axios
    .post("/updatehospitallikes", likes)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in DocSideNav.js
export const updateDoctorProfilePic = (imgSrc) => (dispatch) => {
  axios
    .post("/updatedoctorprofilepic", imgSrc)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// DocInfo.js
export const reportDoctor = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/reportdoctor", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// HospInfo.js
export const reportHospital = (data) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post("/reporthospital", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

export const getData = () => (dispatch) => {
  axios
    .get("/alldata")
    .then((res) => {
      dispatch({
        type: GET_SEARCH_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const getInputs = () => (dispatch) => {
  axios
    .get("/inputs")
    .then((res) => {
      dispatch({
        type: GET_INPUT_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
