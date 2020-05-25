import {
  _LOGOUT_SUCCESS,
  _LOGOUT_FAILED
} from "../constants";
import backendClient from "../../services/backendClient";

function logout( payload ) {

  return async ( dispatch ) => {

    const result = await backendClient.callLogout( payload.autorization,
                                                   payload.logger );

    if ( result instanceof Error ) {

      dispatch(
        {
          type: _LOGOUT_FAILED,
          payload: {
            response: {
              StatusCode: 400,
              Code: "INTERNAL_FRONTEND_ERROR",
              Message: "An internal frontend error has occurred.",
              Errors: [
                {
                  StatusCode: 400,
                  Code: "INTERNAL_FRONTEND_ERROR",
                  Message: "An internal frontend error has occurred."
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
    else if ( result &&
              result.output &&
              result.output.body ) {

      if ( result.output.body.IsError === false &&
           result.output.body.Code === "SUCCESS_LOGOUT" ) {

        dispatch(
          {
            type: _LOGOUT_SUCCESS,
            payload: {
              username: payload.username,
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
            type: _LOGOUT_FAILED,
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

      dispatch(
        {
          type: _LOGOUT_FAILED,
          payload: {
            response: {
              StatusCode: 500,
              Code: "NO_RESPONSE_FROM_SERVER",
              Message: "No response from server. Please check your network connection.",
              Errors: [
                {
                  StatusCode: 500,
                  Code: "NO_RESPONSE_FROM_SERVER",
                  Message: "No response from server. Please check your network connection."
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

  };

}

export default logout;
