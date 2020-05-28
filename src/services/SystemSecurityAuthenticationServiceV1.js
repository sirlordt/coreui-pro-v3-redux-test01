//import CommonUtilities from "../utils/commonUtilities";

const debug = require( "debug" )( "SystemSecurityAuthenticationServiceV1" );

class SystemSecurityAuthenticationServiceV1 {

  static async callLogin( backend,
                          headers,
                          strUsername,
                          strPassword,
                          logger ) {

    const result = {
      input: null,
      output: null
    };

    try {

      const body = {
        Username: strUsername,
        Password: strPassword
      };

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify( body )
      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/login";

      const callResult = await fetch( strRequestURI,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: await callResult.json()
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      options.body = body;

      result.input = options;

    }
    catch ( error ) {

      const strMark = "1DFC6EF03869";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static async callTokenCheck( backend,
                               headers,
                               logger ) {

    const result = {
      input: null,
      output: null
    };

    try {

      const options = {
        method: "POST",
        headers,
        body: null //JSON.stringify( body ),
      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/token/check";

      const callResult = await fetch( strRequestURI,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: await callResult.json()
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      result.input = options;

    }
    catch ( error ) {

      const strMark = "DD5EBFB4BDEE";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

  static async callLogout( backend,
                           headers,
                           logger ) {

    const result = {
      input: null,
      output: null
    };

    try {

      const options = {
        method: "POST",
        headers,
        body: null //JSON.stringify( body ),
      };

      let strRequestURI = `${backend.protocol}${backend.host}:${backend.port}${backend.rootPath}`;

      strRequestURI += "/v1/system/security/authentication/logout";

      const callResult = await fetch( strRequestURI,
                                      options );

      result.output = callResult ? {
        status: callResult.status,
        statusText: callResult.statusText,
        body: await callResult.json()
      } :
        {
          status: null,
          statusText: null,
          body: {
            Code: ""
          }
        };

      result.input = options;

    }
    catch ( error ) {

      const strMark = "88DD50269849";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

      error.mark = strMark;

      if ( logger && typeof logger.error === "function" ) {

        logger.error( error );

      }

    }

    return result;

  }

}

export default SystemSecurityAuthenticationServiceV1;
