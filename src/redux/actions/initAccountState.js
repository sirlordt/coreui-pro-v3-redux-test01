import {
  _INIT_LOCAL_STATE
} from "../constants";

function initAccountState( payload ) {

  return {
    type: _INIT_LOCAL_STATE,
    payload
  };

}

export default initAccountState;
