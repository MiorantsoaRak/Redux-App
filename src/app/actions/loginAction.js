import {
  LOGGED_IN,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT
} from "../constants/login";

import { emptyPeople } from "./actions";
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
