import {
  _CHANGE_LANGUAGE
} from "../constants";

function chanceLanguage( payload ) {

  return {
    type: _CHANGE_LANGUAGE,
    payload
  };

}

export default chanceLanguage;
