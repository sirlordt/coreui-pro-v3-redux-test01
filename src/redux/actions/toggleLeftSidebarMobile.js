import {
  _TOGGLE_LEFT_SIDERBAR_MOBILE
} from "../constants";

function toggleLeftSidebarMobile( payload ) {

  return {
    type: _TOGGLE_LEFT_SIDERBAR_MOBILE,
    payload
  };

}

export default toggleLeftSidebarMobile;
