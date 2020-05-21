import {
  //_INIT_LOCAL_STATE,
  //_SAVE_LOCAL_STATE,
  _LOGIN_SUCCESS,
  _LOGIN_FAILED,
  _LOGOUT_SUCCESS,
  _RESET_ACTIVE_USER
} from "../../constants";
import SystemUtils from "../../../utils/systemUtils";

const initialState = {
  active: "",
  accounts: {},
  transactionId: "",
  actionType: "",
  response: {}
};

/*
  {
    ActiveUserName: "john",
    AccountsDetails: {
      "john": {
        AuthotizationToken: "token1",
        Avatar: "",
        UserName: "user01",
        FirstName: "John Jose",
        LastName: "Connor Rodriguez"
      },
      "sara": {
        AuthotizationToken: "token2",
        Avatar: "",
        Username: "sara",
        Firstname: "Sara Maria",
        Lastname: "Connor Fermin"
      }
    }
  }
*/

function reducer( state = initialState, action ) {

  let result = null;

  switch ( action.type ) {

    /*
    case _INIT_LOCAL_STATE: {

      try {

        const jsonAccountsInfo = JSON.parse( localStorage.getItem( "_ACCOUNTS_INFO" ) );

        result = {

          activeUsername: jsonAccountsInfo.activeUsername || "",
          accountDetails: jsonAccountsInfo.accountDetails || {},
          errorDetails: {}

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      result = state;

      break;

    }

    case _SAVE_LOCAL_STATE: {

      try {

        localStorage.setItem( "_ACCOUNTS_INFO", JSON.stringify( state ) );

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      result = state;

      break;

    }
    */

    case _LOGIN_SUCCESS: {

      try {

        let accounts = state.accounts;

        if ( !accounts ) {

          accounts = {};// Init the object in case of null

        }

        const strUsername = action.payload.response.Data[ 0 ].sysUser.Name;

        accounts[ strUsername ] = action.payload.response.Data[ 0 ]; //Set new field and data or overwrite the old data

        result = {

          ...state, // keep the old state data, spread operator
          active: strUsername,
          accounts,
          transactionId: action.payload.transactionId,
          responseMark: SystemUtils.getUUIDv4(),
          actionType: action.type,
          response: action.payload.response

        };

        const AccountsData = {

          active: result.active,
          accounts: result.accounts

        };

        localStorage.setItem( "_ACCOUNTS_DATA", JSON.stringify( AccountsData ) );

        /*
        if ( action.payload.Callback ) {

          action.payload.Callback( {
            Code: action.type,
            Data: action.payload.Response
          } );

        }
        */

      }
      catch ( error ) {

        console.log( error );

        result = {

          ...state, // keep the old state data, spread operator
          transactionId: action.payload.transactionId,
          responseMark: SystemUtils.getUUIDv4(),
          actionType: "ERROR_IN_REDUCER",
          response: error

        };

        /*
        if ( action.payload.Callback ) {

          action.payload.Callback( {
            Code: "ERROR_IN_REDUCER",
            Data: error
          } );

        }
        */

      }

      break;

    }

    case _LOGIN_FAILED: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          transactionId: action.payload.transactionId,
          responseMark: SystemUtils.getUUIDv4(),
          actionType: action.type,
          response: action.payload.response

        };

        /*
        if ( action.payload.Callback ) {

          action.payload.Callback( {
            Code: action.type,
            Data: action.payload.Response
          } );

        }
        */

      }
      catch ( error ) {

        console.log( error );

        result = {

          ...state, // keep the old state data, spread operator
          transactionId: action.payload.transactionId,
          responseMark: SystemUtils.getUUIDv4(),
          actionType: "ERROR_IN_REDUCER",
          response: error

        };

        /*
        if ( action.payload.Callback ) {

          action.payload.Callback( {
            Code: "ERROR_IN_REDUCER",
            Data: error
          } );

        }
        */

      }

      break;

    }

    case _RESET_ACTIVE_USER:
    case _LOGOUT_SUCCESS: {

      try {

        let accountDetails = state.accountDetails;

        if ( !accountDetails ) {

          accountDetails = {};// Init the object in case of null

        }

        if ( accountDetails[ action.payload.Username ] ) {

          accountDetails[ action.payload.Username ].Authotization = null; //Reset the autorization token

        }

        result = {

          ...state, //Keep the old state data, spread operator
          activeUsername: "",
          accountDetails,
          transactionId: action.payload.transactionId,
          responseMark: SystemUtils.getUUIDv4(),
          actionType: action.type,
          response: action.payload.response

        };

      }
      catch ( error ) {

        console.log( error );

        result = {

          ...state, // keep the old state data, spread operator
          transactionId: action.payload.transactionId,
          mark: SystemUtils.getUUIDv4(),
          actionType: "ERROR_IN_REDUCER",
          response: error

        };

        /*
        if ( action.payload.Callback ) {

          action.payload.Callback( {
            Code: "ERROR_IN_REDUCER",
            Data: error
          } );

        }
        */

      }

      break;

    }

    default: {

      result = state;

      /*
      if ( action.payload &&
           action.payload.Callback ) {

        action.payload.Callback( {
          Code: "ACTION_TYPE_NOT_FOUND",
          Data: {
            Action: action.Type
          }
        } );

      }
      */

    }

  }

  return result;

}

export default reducer;
