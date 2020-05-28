
const initialState = {

  connection: {

    active: "local01",
    local01: {

      protocol: "http://",
      host: "127.0.0.1",
      port: 9090,
      rootPath: "/backend-server-01"

    },

    remote01: {

      protocol: "https://",
      host: "domain.com",
      port: 9090,
      rootPath: "/remote-path"

    }

  },

  authentication: {

    active: "",
    lastCheck: "",
    accounts: {},

    results: {}

    /* Example
    results: {

      "cc160855-d192-40ee-80be-9406a181752d": {
        actionType: "LOGIN_SUCCESS",
        responseMark: "7b94c856-0c5d-4f58-b497-3ca4b5218b15"
        data: {
          ... json data from backend
        }
      }
      "bc45ddcc-245b-4ce5-8be3-52cfcd80f0b9": {
        actionType: "LOGIN_FAILED",
        responseMark: "4c4c4435-f881-40c8-8db0-fa2d64b8472d",
        data: {
          ... json data from backend
        }
      }

    }
    */

  },

  frontend: {

    id: "ccc1",
    language: "en_US",
    timeZoneId: Intl.DateTimeFormat().resolvedOptions().timeZone,

    themeDark: false,
    isLeftSidebarOpen: "responsive",
    isLeftSidebarMinimized: true,
    sidebarMobile: false,
    sidebarDisplay: "sm",
    isRightSidebarOpen: false,

    results: {},

    modalStack: new Map()

    /*
    modalCode: "",
    modalTitle: "",
    modalMessage: "",
    modalContent: null,
    modalButtons: null
    */

  }

};

export default initialState;
