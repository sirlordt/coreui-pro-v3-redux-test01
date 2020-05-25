import mainStore from "../redux/store";

import SystemSecurityAuthenticationServiceV1 from "./SystemSecurityAuthenticationServiceV1";

class BackendClient {

  static defaultHeaders = {
    "Content-Type": "application/json",
    "Authorization": "",
    "BinaryDataToken": "",
    "FrontendId": "",
    "TimeZoneId": "",
    "Language": "en_US"
  };

  static getBackendConfig() {

    const result = mainStore.getState().connection[ mainStore.getState().connection.active ];

    return result;

  }

  static getHeadersConfig() {

    const result = {

      ...BackendClient.defaultHeaders,
      FrontendId: mainStore.getState().frontend.id,
      TimeZoneId: mainStore.getState().frontend.timeZoneId,
      Language: mainStore.getState().frontend.language

    };

    return result;

  }

  static async callLogin( strUsername,
                          strPassword,
                          logger ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      result = await SystemSecurityAuthenticationServiceV1.callLogin( backendConfig,
                                                                      headersConfig,
                                                                      strUsername,
                                                                      strPassword,
                                                                      logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callTokenCheck( strAutorization,
                               logger ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await SystemSecurityAuthenticationServiceV1.callTokenCheck( backendConfig,
                                                                           headersConfig,
                                                                           logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

  static async callLogout( strAutorization,
                           logger ) {

    let result = null;

    try {

      const backendConfig = BackendClient.getBackendConfig();

      const headersConfig = BackendClient.getHeadersConfig();

      headersConfig.Authorization = strAutorization;

      result = await SystemSecurityAuthenticationServiceV1.callLogout( backendConfig,
                                                                       headersConfig,
                                                                       logger );

    }
    catch ( error ) {

      result = error;

    }

    return result;

  }

}

export default BackendClient;
