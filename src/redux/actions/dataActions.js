import { GET_SEARCH_DATA, GET_INPUT_LIST } from "../types";
import axios from "axios";

// -------------Used in page Result.js and Home.js (search)

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

// -------------Used in page Result.js, Home.js (search) and DocEditProfile.js

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

// -------------Used in page account.js

// used in DocEditProfile.js
export const sendSpecList = (data) => (dispatch) => {
  axios
    .post("/updatespecialtylist", data)
    .then(() => {
      dispatch(getInputs());
    })
    .catch((err) => console.error(err));
};

// used in DocEditProfile.js
export const sendCondList = (data) => (dispatch) => {
  axios
    .post("/updateconditionlist", data)
    .then(() => {
      dispatch(getInputs());
    })
    .catch((err) => console.error(err));
};

// used in DocEditProfile.js
export const sendProfileToSpec = (specData) => (dispatch) => {
  axios
    .post("/updatepublicprofile", specData)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// used in DocEditProfile.js
export const deleteProfileInSpec = (data) => (dispatch) => {
  axios
    .post("/deleteoldprofile", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// // used in DocEditProfile.js
export const publish = (data) => (dispatch) => {
  axios
    .post("/publishprofile", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// -------------Used in page DocProfile and HospProfile.js

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
  axios
    .post("/reportdoctor", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};

// HospInfo.js
export const reportHospital = (data) => (dispatch) => {
  axios
    .post("/reporthospital", data)
    .then(() => {
      dispatch(getData());
    })
    .catch((err) => console.error(err));
};
