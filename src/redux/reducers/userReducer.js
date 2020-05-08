import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";

// initial state; when user is not logged in!
const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
};

//depending on the action type we receive, we will do something
export default function (state = initialState, action) {
  switch (action.type) {
    /*catch action type */
    /* if we get set_authenticated (call from App.js) spread the state we already have, make authenticated: true*/
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    /*when we logout, return to initial state*/
    case SET_UNAUTHENTICATED:
      return initialState;

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
