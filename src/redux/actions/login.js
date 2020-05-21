import {
  _LOGIN_SUCCESS,
  _LOGIN_FAILED
} from "../constants";
import SystemSecurityAuthenticationServiceV1 from "../../services/SystemSecurityAuthenticationServiceV1";

function login( payload ) {

  return async ( dispatch ) => {

    const headers = {
      "Authorization": "",
      "Content-Type": "application/json",
      "FrontendId": "ccc1",
      "TimeZoneId": "America/Los_Angeles",
      "Language": "en_US",
      "BinaryDataToken": ""
    };

    const remoteBackendClient = new SystemSecurityAuthenticationServiceV1( "http://",
                                                                           "127.0.0.1",
                                                                           9090,
                                                                           "/backend-server-01" );

    const result = await remoteBackendClient.callLogin( headers,
                                                        payload.username,
                                                        payload.password );

    //console.log( result );

    if ( result &&
         result.output &&
         result.output.body ) {

      if ( result.output.body.IsError === false &&
           result.output.body.Code === "SUCCESS_LOGIN" ) {

        dispatch(
          {
            type: _LOGIN_SUCCESS,
            payload: {
              response: result.output.body,
              callback: payload.callback,
              transactionId: payload.transactionId
            }
          }
        );

      }
      else {

        dispatch(
          {
            type: _LOGIN_FAILED,
            payload: {
              response: result.output.body,
              callback: payload.callback,
              transactionId: payload.transactionId
            }
          }
        );

      }

    }
    else {

      //console.log( "LOGIN_FAILED" );

      dispatch(
        {
          type: _LOGIN_FAILED,
          payload: {
            response: {
              StatusCode: 500,
              Code: "NO_RESPONSE_FROM_SERVER",
              Message: "No response from server",
              Errors: [
                {
                  StatusCode: 500,
                  Code: "NO_RESPONSE_FROM_SERVER",
                  Message: "No response from server"
                }
              ],
              Warning: []
            },
            callback: payload.callback,
            transactionId: payload.transactionId
          }
        }
      );

    }

    /*
    let jsonData = {};

    if ( payload.username === "admin" ) {

      if ( payload.password === "12345678" ) {

        jsonData = {

          Success: 1,
          AccountInfo: {

            AuthotizationToken: "69071117-c26d-4b38-8547-059581975047",
            Avatar: "admin-avatar.jpg",
            UserName: "admin",
            FirstName: "John Jose",
            LastName: "Connor Rodríguez"

          }

        };

      }
      else {

        jsonData = {

          Success: 0,
          ErrorDetails: {

            Code: "ERROR_INAVLID_PASSWORD",
            Message: "Error the password is invalid"

          }

        };

      }

    }
    else {

      jsonData = {

        Success: 0,
        ErrorDetails: {

          Code: "ERROR_INAVLID_USERNAME",
          Message: "Error the user name is invalid"

        }

      };

    }

    if ( jsonData.Success === 1 ) {

      dispatch(
        {
          type: _LOGIN_SUCCESS,
          payload: jsonData
        }
      );

    }
    else {

      dispatch(
        {
          type: _LOGIN_FAILED,
          payload: jsonData
        }
      );

    }
    */

  };

}

export default login;
