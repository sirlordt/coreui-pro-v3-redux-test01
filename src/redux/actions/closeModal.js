import {
  _CLOSE_MODAL
} from "../constants";

function closeModal( payload ) {

  return {
    type: _CLOSE_MODAL,
    payload
  };

}

export default closeModal;
