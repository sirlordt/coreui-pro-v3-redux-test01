import {
  _TOGGLE_LEFT_SIDERBAR
} from "../constants";

function toggleLeftSidebar( payload ) {

  return {
    type: _TOGGLE_LEFT_SIDERBAR,
    payload
  };

}

export default toggleLeftSidebar;
