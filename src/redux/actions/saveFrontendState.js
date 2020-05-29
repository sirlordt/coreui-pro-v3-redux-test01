import {
  _SAVE_FRONTEND_STATE
} from "../constants";

function saveFrontendState( payload ) {

  return {
    type: _SAVE_FRONTEND_STATE,
    payload
  };

}

export default saveFrontendState;
