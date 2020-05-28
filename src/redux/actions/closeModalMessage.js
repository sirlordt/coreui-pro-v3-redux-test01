import {
  _CLOSE_MODAL_MESSAGE
} from "../constants";

function closeModalMessage( payload ) {

  return {
    type: _CLOSE_MODAL_MESSAGE,
    payload
  };

}

export default closeModalMessage;
