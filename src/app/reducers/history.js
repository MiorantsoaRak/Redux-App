import {
  FETCH_HISTORY,
  FETCH_HISTORY_ERROR,
  FETCH_HISTORY_SUCCESS
} from "../constants/transaction";

const initialState = {
  processing: false,
  error: false,
  history: []
};

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_HISTORY:
      return {
        ...state,
        processing: true,
        history: []
      };

    case FETCH_HISTORY_SUCCESS:
      return {
        ...state,
        processing: false,
        history: action.data
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
