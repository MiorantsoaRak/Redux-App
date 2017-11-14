import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS,
  FETCH_SOLDE,
  FETCH_SOLDE_ERROR,
  FETCH_SOLDE_SUCCESS,
  TRANSACTION,
  TRANSACTION_ERROR,
  TRANSACTION_SUCCESS
} from "../constants/transaction";

export function doTransaction() {
  return {
    type: TRANSACTION
  };
}

export function transactionError() {
  return {
    type: TRANSACTION_ERROR
  };
}

export function transactionSuccess(data) {
  return {
    type: TRANSACTION_SUCCESS,
    data
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

export function fetchSolde() {
  return {
    type: FETCH_SOLDE
  };
}
export function fetchSoldeSuccess(data) {
  return {
    type: FETCH_HISTORY_SUCCESS,
    data
  };
}

export function fetchSoldeError() {
  return {
    type: FETCH_SOLDE_ERROR
  };
}
