import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS,
  FETCH_HISTORY_IN,
  FETCH_HISTORY_OUT
} from "../constants/transaction";

import Services from "../services/history";

const services = new Services();

const initialState = {
  processing: false,
  done: false,
  error: false,
  historyIn: [],
  historyOut: [],
  data: [],
  history: []
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        ...state,
        done: false,
        processing: true,
        data: [],
        history: [],
        historyIn: [],
        historyOut: []
      };

    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        processing: false,
        data: action.data,
        done: true,
        history: action.data
      };
    case FETCH_HISTORY_IN:
      return {
        ...state,
        data: action.data,
        historyIn: action.data
      };
    case FETCH_HISTORY_OUT:
      return {
        ...state,
        data: action.data,
        historyOut: action.data
      };
    case FETCH_HISTORY_ERROR:
      return {
        ...state,
        processing: false,
        error: true
      };
    default:
      return state;
  }
}
