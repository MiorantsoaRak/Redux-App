import {
  TRANSACTION,
  TRANSACTION_ERROR,
  TRANSACTION_SUCCESS
} from "../constants/transaction";

const initialState = {
  processing: false,
  error: false,
  response: []
};

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION:
      return {
        ...state,
        processing: true,
        response: []
      };
    case TRANSACTION_SUCCESS:
      return {
        ...state,
        processing: false,
        response: action.data
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        processing: false,
        error: true
      };
    default:
      return state;
  }
}
