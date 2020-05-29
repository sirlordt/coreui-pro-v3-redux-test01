import {
  _SHOW_MODAL
} from "../constants";

function showModal( payload ) {

  return {
    type: _SHOW_MODAL,
    payload
  };

}

export default showModal;
