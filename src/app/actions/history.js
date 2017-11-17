import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_IN,
  FETCH_HISTORY_OUT
} from "../constants/transaction";

import Services from "../services/history";

const services = new Services();
export function fetchHistoryFromApi(accountId) {
  return dispatch => {
    dispatch(fetchHistory);
    services
      .getHistory(accountId)
      .then(history => {
        dispatch(fetchHistorySuccess(history));
      })
      .catch(err => dispatch(fetchHistoryError()));
  };
}

export function fetchHistoryInAPI(history, accountId) {
  return dispatch => {
    let historyIn = services.getReceivedTransaction(history, accountId);
    dispatch(fetchHistoryIn(historyIn));
  };
}

export function fetchHistoryAll(history) {
  return dispatch => {
    dispatch(fetchHistorySuccess(history));
  };
}

export function fetchHistoryOutAPI(history, accountId) {
  return dispatch => {
    let historyOut = services.getSentTransactionData(history, accountId);
    dispatch(fetchHistoryOut(historyOut));
  };
}
export function fetchHistory() {
  return {
    type: FETCH_HISTORY
  };
}

export function fetchHistoryIn(data) {
  return {
    type: FETCH_HISTORY_IN,
    data
  };
}

export function fetchHistoryOut(data) {
  return {
    type: FETCH_HISTORY_OUT,
    data
  };
}
export function fetchHistorySuccess(data) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    data
  };
}
export function fetchHistoryError() {
  return {
    type: FETCH_HISTORY_ERROR
  };
}
