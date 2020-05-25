import {
  //_INIT_LOCAL_STATE,
  //_SAVE_LOCAL_STATE,
  _TOGGLE_DARK,
  _TOGGLE_LEFT_SIDERBAR,
  _TOGGLE_LEFT_SIDERBAR_MOBILE,
  _MINIMIZE_LEFT_SIDERBAR,
  _CLOSE_LEFT_SIDERBAR,
  _TOGGLE_RIGHT_SIDERBAR
} from "../../constants";

import initialState from "../initialState";

/*
const initialState = {
  themeDark: false,
  language: "en_US",
  messages: {},
  isLeftSidebarOpen: "responsive",
  isLeftSidebarMinimized: true,
  sidebarMobile: false,
  sidebarDisplay: "sm",
  isRightSidebarOpen: false
};
*/

function reducer( state = initialState.frontend, action ) {

  let result = null;

  switch ( action.type ) {

    /*
    case _INIT_LOCAL_STATE: {

      try {

        const jsonFrontendInfo = JSON.parse( localStorage.getItem( "_FRONTEND_INFO" ) );

        result = {
          themeDark: jsonFrontendInfo.themeDark || false,
          language: jsonFrontendInfo.language || "en_US",
          isLeftSidebarOpen: jsonFrontendInfo.isLeftSidebarOpen || "responsive",
          isLeftSidebarMinimized: jsonFrontendInfo.isLeftSidebarMinimized || false,
          sidebarMobile: jsonFrontendInfo.sidebarMobile || false,
          sidebarDisplay: jsonFrontendInfo.sidebarDisplay || "sm",
          isRightSidebarOpen: jsonFrontendInfo.isRightSidebarOpen || false
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

        localStorage.setItem( "_FRONTEND_INFO", JSON.stringify( state ) );

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      result = state;

      break;

    }
    */

    case _TOGGLE_DARK: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          themeDark: !state.themeDark //action.payload.themeDark

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _TOGGLE_LEFT_SIDERBAR: {

      try {

        const leftSidebarOpened = state.isLeftSidebarOpen === true || state.isLeftSidebarOpen === "responsive";

        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarOpen: leftSidebarOpened ? false : "responsive"

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _TOGGLE_LEFT_SIDERBAR_MOBILE: {

      try {

        const leftSidebarClosed = state.isLeftSidebarOpen === "responsive" || state.isLeftSidebarOpen === false;

        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarOpen: leftSidebarClosed ? true : "responsive"

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _MINIMIZE_LEFT_SIDERBAR: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarMinimized: !state.isLeftSidebarMinimized

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _CLOSE_LEFT_SIDERBAR: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarOpen: "responsive"

        };

      }
      catch ( error ) {

        console.log( error );
        result = state;

      }

      break;

    }

    case _TOGGLE_RIGHT_SIDERBAR: {

      try {

        result = {

          ...state, // keep the old state data, spread operator
          isRightSidebarOpen: !state.isRightSidebarOpen

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
