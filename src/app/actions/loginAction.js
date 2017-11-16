import {
  LOGGED_IN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/login";

import { emptyPeople } from "./actions";
import {
  fetchUserData,
  fetchUserDataError,
  fetchUserDataSuccess
} from "./authentication";

import {
  FETCH_USER_DATA,
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_ERROR
} from "../constants/authentication";
import Services from "../services/services";

const services = new Services();
export function loginFromAPI(webviewState) {
  return dispatch => {
    dispatch(login());
    services.extractOauthCode(webviewState.url).then(oauthCode => {
      console.log("***************");
      console.log(oauthCode);
      console.log("***************");
      services.getToken(oauthCode).then(token => {
        dispatch(fetchUserData(token));
        services
          .getUserInfo()
          .then(reponse => dispatch(fetchUserDataSuccess(reponse)))
          .catch(err => dispatch(fetchUserDataError()));
      });
    });
  };
}

export function login() {
  return {
    type: LOGIN
  };
}

export function loginSucess() {
  return {
    type: LOGIN_SUCCESS
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR
  };
}

export function loggedIn(data) {
  return {
    type: LOGGED_IN,
    data
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(logout());
    dispatch(emptyPeople());
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
