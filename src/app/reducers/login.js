import {
  LOGGED_IN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/login";

const initialState = {
  loggedIn: false,
  processing: false,
  error: false,
  data: []
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
        processing: true,
        error: false
      };
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: true,
        error: false,
        processing: false
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        processing: false,
        error: false
      };

    case LOGIN_ERROR:
      return {
        ...state,
        loggedIn: false,
        processing: false,
        error: true
      };

    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        processing: false,
        error: false
      };
    default:
      return state;
  }
}
