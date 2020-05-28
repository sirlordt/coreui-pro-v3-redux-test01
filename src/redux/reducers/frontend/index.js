import {
  cloneDeep
} from "lodash";

import {
  _ERROR_IN_REDUCER,
  _DELETE_RESULT,
  //_INIT_LOCAL_STATE,
  //_SAVE_LOCAL_STATE,
  _TOGGLE_DARK,
  _TOGGLE_LEFT_SIDERBAR,
  _TOGGLE_LEFT_SIDERBAR_MOBILE,
  _MINIMIZE_LEFT_SIDERBAR,
  _CLOSE_LEFT_SIDERBAR,
  _TOGGLE_RIGHT_SIDERBAR,
  _SHOW_MODAL_MESSAGE,
  _CLOSE_MODAL_MESSAGE,
  _CLEAR_MODAL_MESSAGE
} from "../../constants";
import SystemUtils from "../../../utils/systemUtils";

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

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      result = state;

      break;

    }

    case _SAVE_LOCAL_STATE: {

      try {

        localStorage.setItem( "_FRONTEND_INFO", JSON.stringify( state ) );

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      result = state;

      break;

    }
    */

    case _DELETE_RESULT: {

      try {

        result = cloneDeep( state );

        if ( result.results &&
             result.results[ action.payload.transactionId ] ) {

          delete result.results[ action.payload.transactionId ];

        }

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          responseMark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _TOGGLE_DARK: {

      try {

        result = cloneDeep( state );

        result.themeDark = !result.themeDark;

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

        /*
        result = {

          ...state, // keep the old state data, spread operator
          themeDark: !state.themeDark //action.payload.themeDark

        };
        */

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _TOGGLE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        const leftSidebarOpened = result.isLeftSidebarOpen === true || result.isLeftSidebarOpen === "responsive";

        result.isLeftSidebarOpen = leftSidebarOpened ? false : "responsive";

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

        /*
        result = {

          ...state, // keep the old state data, spread operator
          isLeftSidebarOpen: leftSidebarOpened ? false : "responsive"

        };
        */

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _TOGGLE_LEFT_SIDERBAR_MOBILE: {

      try {

        result = cloneDeep( state );

        const leftSidebarClosed = result.isLeftSidebarOpen === "responsive" || result.isLeftSidebarOpen === false;

        result.isLeftSidebarOpen = leftSidebarClosed ? true : "responsive";

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _MINIMIZE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isLeftSidebarMinimized = !result.isLeftSidebarMinimized;

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _CLOSE_LEFT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isLeftSidebarOpen = "responsive";

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _TOGGLE_RIGHT_SIDERBAR: {

      try {

        result = cloneDeep( state );

        result.isRightSidebarOpen = !result.isRightSidebarOpen;

        result.results[ action.payload.transactionId ] = {
          actionType: action.type,
          mark: SystemUtils.getUUIDv4(),
          data: "success"
        };

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }
    case _SHOW_MODAL_MESSAGE: {

      try {

        result = cloneDeep( state );

        if ( !result.modalStack ) {

          result.modalStack = new Map();

        }

        const modalInfo = {
          showMe: true,
          id: action.payload.modalId,
          code: action.payload.modalCode,
          title: action.payload.modalTitle,
          message: action.payload.modalMessage,
          content: action.payload.modalContent,
          buttons: action.payload.modalButtons,
          buttonsHandlers: action.payload.modalButtonsHandlers,
          callback: action.payload.modalCallback,
          tag: action.payload.modalTag
        };

        result.modalStack.set( action.payload.modalId, modalInfo );

        /*
        result.modalId = action.payload.modalId;
        result.modalCode = action.payload.modalCode;
        result.modalTitle = action.payload.modalTitle;
        result.modalMessage = action.payload.modalMessage;
        result.modalButtons = action.payload.modalButtons;
        result.modalContent = action.payload.modalContent;
        */

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _CLOSE_MODAL_MESSAGE: {

      try {

        result = cloneDeep( state );

        if ( action.payload.transactionId ) {

          const modalInfo = result.modalStack.get( action.payload.transactionId ); //.showMe = false;

          modalInfo.showMe = false;

        }

        if ( action.payload.clearModalCode ) {

          result.modalStack.forEach( ( modalInfo ) => {

            if ( action.payload.clearModalCode === modalInfo.code ) {

              modalInfo.showMe = false;

            }

          } );

        }

        /*
        result.modalId = "";
        result.modalCode = "";
        result.modalTitle = "";
        result.modalMessage = "";
        result.modalButtons = null;
        result.modalContent = null;
        */

      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

      }

      break;

    }

    case _CLEAR_MODAL_MESSAGE: {

      try {

        result = cloneDeep( state );

        if ( action.payload.transactionId ) {

          result.modalStack.delete( action.payload.transactionId );

        }

        if ( action.payload.clearModalCode ) {

          result.modalStack.forEach( ( modalInfo ) => {

            if ( action.payload.clearModalCode === modalInfo.code ) {

              result.modalStack.delete( modalInfo.id );

            }

          } );

        }


      }
      catch ( error ) {

        result = cloneDeep( state );

        if ( !result.results ) {

          result.results = {};

        }

        result.results[ action.payload.transactionId ] = {
          actionType: _ERROR_IN_REDUCER,
          mark: SystemUtils.getUUIDv4(),
          data: error
        };

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
