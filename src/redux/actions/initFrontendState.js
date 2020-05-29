import {
  _INIT_FRONTEND_STATE
} from "../constants";

function initFrontendState( payload ) {

  return {
    type: _INIT_FRONTEND_STATE,
    payload
  };

}

export default initFrontendState;
