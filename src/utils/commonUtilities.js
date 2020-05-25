
const debug = require( "debug" )( "CommonUtilities" );

class CommonUtilities {

  static getSourceCodePosition( intFormat = 0 ) {

    /*
    Error:
      at Function.getSourceCodePosition (/home/dsistemas/Escritorio/Node_JS/26-10-2019/backend-server-01/src/system/common/common.utilities.ts:190:21)
      at /home/dsistemas/Escritorio/Node_JS/26-10-2019/backend-server-01/src/server.ts:76:34
      at Generator.next (<anonymous>)
      at fulfilled (/home/dsistemas/Escritorio/Node_JS/26-10-2019/backend-server-01/src/server.ts:5:58)
    */
    let result = null;

    //let strMethodName = "";
    let strFile = "";
    let strFunctionName = null;
    let intLine = -1;
    let intColumn = -1;

    try {

      const stack = new Error().stack;

      //let debugMark = debug.extend( 'B4FC6014F2E3' + ( cluster.worker && cluster.worker.id ? '-' + cluster.worker.id : '' ) );
      //debugMark( "%O", stack );

      // package.json => build: --async-stack-trace node build/server.js And tsconfig.json => "target": "es2018"
      const strPosition = stack.split( "\n" )[ 2 ].split( ":" );

      strFile = strPosition[ 0 ].trim();

      if ( strFile.indexOf( "(" ) !== -1 ) {

        strFunctionName = strFile.substr( 0, strFile.indexOf( "(" ) - 1 );

        if ( strFunctionName.startsWith( "at" ) ) {

          strFunctionName = strFunctionName.replace( "at", "" ).trim();

        }

        strFile = strFile.substr( strFile.indexOf( "(" ) + 1 );

      }
      else {

        strFunctionName = strFile.substr( 0, strFile.indexOf( "at" ) - 1 );
        strFile = strFile.substr( strFile.indexOf( "at " ) + 3 ).trim();

      }

      if ( strPosition.length >= 1 ) {

        intLine = parseInt( strPosition[ 1 ], 10 );

      }

      if ( strPosition.length >= 2 ) {

        intColumn = parseInt( strPosition[ 2 ], 10 );

      }

    }
    catch ( error ) {

      const strMark = "F0FCDAA2D175";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );

    }

    if ( intFormat === 0 ) {

      const strFuncName = strFunctionName ? `${strFunctionName}:` : "";

      result = `${strFile}:${strFuncName}${intLine}:${intColumn}`;

    }
    else {

      result = {
        file: strFile,
        line: intLine,
        column: intColumn,
        function: strFunctionName || "Unknown"
      };

    }

    return result;

  }

  static parseJSON( strJSONToParse, logger ) {

    let result = {}; //Safe empty object

    try {

      result = JSON.parse( strJSONToParse );

    }
    catch ( error ) {

      const sourcePosition = CommonUtilities.getSourceCodePosition( 1 );

      sourcePosition.method = `${this.name}.${this.parseJSON.name}`;

      const strMark = "D72A94FD3E4B";

      const debugMark = debug.extend( strMark );

      debugMark( "Error message: [%s]", error.message ? error.message : "No error message available" );
      debugMark( "Catched on: %O", sourcePosition );

      error.mark = strMark;
      //error.logId = SystemUtilities.getUUIDv4();

      if ( logger && typeof logger.error === "function" ) {

        error.catchedOn = sourcePosition;
        logger.error( error );

      }

    }

    return result;

  }

  static getCurrentTimeZoneId() {

    const strResult = Intl && Intl.DateTimeFormat().resolvedOptions().timeZone;

    return strResult;

  }

}

export default CommonUtilities;
