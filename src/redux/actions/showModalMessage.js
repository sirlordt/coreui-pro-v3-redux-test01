import {
  _SHOW_MODAL_MESSAGE
} from "../constants";

function showModalMessage( payload ) {

  return {
    type: _SHOW_MODAL_MESSAGE,
    payload
  };

}

export default showModalMessage;
