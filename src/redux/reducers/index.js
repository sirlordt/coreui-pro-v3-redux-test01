import {
  combineReducers
} from "redux";

import connection from "./connection";
import authentication from "./authentication";
import frontend from "./frontend";

const rootReducer = combineReducers(
  {
    connection,
    authentication,
    frontend
  }
);

export default rootReducer;
