import {
  combineReducers
} from "redux";

import authentication from "./authentication";
import frontend from "./frontend";

const rootReducer = combineReducers(
  {
    authentication,
    frontend
  }
);

export default rootReducer;
