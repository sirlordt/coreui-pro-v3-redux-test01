import {
  _TOGGLE_DARK
} from "../constants";

function toggleDark( payload ) {

  return {
    type: _TOGGLE_DARK,
    payload
  };

}

export default toggleDark;
