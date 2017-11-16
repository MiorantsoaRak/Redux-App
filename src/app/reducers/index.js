import { combineReducers } from "redux";
import login from "./login";
import people from "./people";
import transaction from "./transaction";
import history from "./history";
import solde from "./solde";

const rootReducer = combineReducers({
  login,
  people,
  transaction,
  history,
  solde
});

export default rootReducer;
