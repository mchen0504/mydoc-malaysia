import { GET_SEARCH_DATA, GET_INPUT_LIST } from "../types";

const initialState = {
  loading: false,
  searchInfo: {},
  conditionList: [],
  specialtyList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_DATA:
      return {
        ...state,
        searchInfo: action.payload,
      };
    case GET_INPUT_LIST:
      return {
        ...state,
        conditionList: action.payload[0],
        specialtyList: action.payload[1],
      };
    default:
      return state;
  }
}
