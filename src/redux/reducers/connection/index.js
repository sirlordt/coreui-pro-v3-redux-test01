import {
  _ERROR_IN_REDUCER,
  _DELETE_RESULT
} from "../../constants";
import SystemUtils from "../../../utils/systemUtils";

import initialState from "../initialState";

function reducer( state = initialState.connection, action ) {

  let result = null;

  switch ( action.type ) {

    case _DELETE_RESULT: {

      try {

        result = {

          ...state // keep the old state data, spread operator

        };

        if ( result.results &&
             result.results[ action.payload.transactionId ] ) {

          delete result.results[ action.payload.transactionId ];

        }

      }
      catch ( error ) {

        result = {

          ...state // keep the old state data, spread operator

        };

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          responseMark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    default: {

      result = state;

    }

  }

  return result;

}

export default reducer;
