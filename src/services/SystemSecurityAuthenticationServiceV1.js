
class SystemSecurityAuthenticationServiceV1 {

  strProtocol = "";
  // eslint-disable-next-line lines-between-class-members
  strHost = "";
  intPort = 9090;
  strRootPath = "";

  constructor( strProtocol,
    strHost,
    intPort,
    strRootPath ) {

    this.strProtocol = strProtocol;
    this.strHost = strHost;
    this.intPort = intPort;
    this.strRootPath = strRootPath;

  }

  async callLogin( headers,
    strUsername,
    strPassword ) {

    const result = {
      input: null, output: null
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

      let strRequestPath = `${this.strProtocol + this.strHost}:${this.intPort}${this.strRootPath}`;

      strRequestPath += "/v1/system/security/authentication/login";

      const callResult = await fetch( strRequestPath,
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

      console.log( error );

    }

    return result;

  }

}

export default SystemSecurityAuthenticationServiceV1;
