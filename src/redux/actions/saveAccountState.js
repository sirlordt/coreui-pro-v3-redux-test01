import {
  _SAVE_LOCAL_STATE
} from "../constants";

function saveAccountState( payload ) {

  return {
    type: _SAVE_LOCAL_STATE,
    payload
  };

}

export default saveAccountState;
