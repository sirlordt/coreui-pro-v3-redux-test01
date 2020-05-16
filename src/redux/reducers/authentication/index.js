import {
  //_INIT_LOCAL_STATE,
  //_SAVE_LOCAL_STATE,
  _LOGIN_SUCCESS,
  _LOGIN_FAILED,
  _LOGOUT_SUCCESS,
  _RESET_ACTIVE_USER
} from "../../constants";

const initialState = {
  active: "",
  accounts: {},
  warnings: [],
  errors: []
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

        const strUsername = action.payload.Data[ 0 ].sysUser.Name;

        accounts[ strUsername ] = action.payload.Data[ 0 ]; //Set new field and data or overwrite the old data

        result = {

          ...state, // keep the old state data, spread operator
          active: strUsername,
          accounts,
          warnings: action.payload.Errors,
          errors: action.payload.Warnings

        };

        const AccountsData = {

          active: result.active,
          accounts: result.accounts

        };

        localStorage.setItem( "_ACCOUNTS_DATA", JSON.stringify( AccountsData ) );

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _LOGIN_FAILED: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          warnings: action.payload.Warnings,
          errors: action.payload.Errors

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

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

          accountDetails[ action.payload.Username ].AuthotizationToken = null; //Reset the autorization token

        }

        result = {

          ...state, //Keep the old state data, spread operator
          activeUsername: "",
          accountDetails

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

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
