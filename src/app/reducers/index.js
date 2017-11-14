import { combineReducers } from "redux";
import login from "./login";
import people from "./people";

const rootReducer = combineReducers({
  login,
  people
});

export default rootReducer;
