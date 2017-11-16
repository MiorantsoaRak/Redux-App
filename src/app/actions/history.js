import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS
} from "../constants/transaction";

import Services from "../services/history";

const services = new Services();
export function fetchHistoryFromApi(accountId) {
  return dispatch => {
    dispatch(fetchHistory);
    services
      .getHistory(accountId)
      .then(history => dispatch(fetchHistorySuccess(history)))
      .catch(err => dispatch(fetchHistoryError()));
  };
}

export function fetchHistory() {
  return {
    type: FETCH_HISTORY
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
