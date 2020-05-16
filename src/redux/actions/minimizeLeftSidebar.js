import {
  _MINIMIZE_LEFT_SIDERBAR
} from "../constants";

function minimizeLeftSideBar( payload ) {

  return {
    type: _MINIMIZE_LEFT_SIDERBAR,
    payload
  };

}

export default minimizeLeftSideBar;
