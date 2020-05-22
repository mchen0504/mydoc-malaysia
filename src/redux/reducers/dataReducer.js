import {
  GET_SEARCH_DATA,
  GET_HOSP_DATA,
} from "../types";

const initialState = {
  loading: false,
  searchInfoHospital: {},
  doctorInfo: {},
  searchInfo: {},
  doctorUserInfo: {}
};

//depending on the action type we receive, we will do something
export default function (state = initialState, action) {
  switch (action.type) {
    /*catch action type */
    case GET_HOSP_DATA:
      return {
        ...state,
        searchInfoHospital: action.payload,
      };
    case GET_SEARCH_DATA:
      return {
        ...state,
        searchInfo: action.payload,
      };
    default:
      return state;
  }
}
