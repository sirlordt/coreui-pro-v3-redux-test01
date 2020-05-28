import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import PropTypes from "prop-types";
import {
  CButton
} from "@coreui/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  closeModalMessage,
  tokenCheck,
  logout
} from "../../redux/actions";

import MessageModal from "../message";
import SystemUtils from "../../utils/systemUtils";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class ModalManager extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4()

    };

  }

  tokenCheck = ( modalId, modalTag ) => {

    const intTokenCheck = SystemUtils.tokenCheckIsNeeded( this.props.authentication );

    if ( intTokenCheck === 1 ||
         modalTag === "forceCheckToken" ) { //Check needed

      //Launch token check
      this.props.tokenCheck( {
        transactionId: modalId,
        authorization: this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
        logger: null
      } );

    }
    else {

      //0 = No authentication
      //2 = Authenticaticated but no check needed

      if ( intTokenCheck === -1 ) { //Invalid status state. Reset the state

        this.props.resetActiveUser( {
          transactionId: modalId,
          username: this.props.authentication.active
        } );

      }

      this.props.closeModalMessage( {
        transactionId: modalId,
        clearModalCode: "NO_RESPONSE_FROM_SERVER"
      } );

    }

  }

  onClickButtonCloseModal = ( event ) => {

    this.props.closeModalMessage( {

      transactionId: event.modalId

    } );

    if ( event.callback ) {

      event.callback( event );

    }

  }

  //NFRS = (N)o (R)esponse (F)rom (S)erver
  onClickButtonCheckAgainNRFSModal = ( event ) => {

    this.tokenCheck( event.modalId,
                     event.modalTag );

    if ( event.callback ) {

      event.callback( event );

    }

  }

  onClickButtonLogoutModalYes = ( event ) => {

    event && event.preventDefault();

    const strUsername = this.props.authentication.active;
    const strAutorization = this.props.authentication.accounts[ this.props.authentication.active ].Authorization;

    this.props.logout( {
      transactionId: event.modalId, //this.state.id,
      username: strUsername,
      authorization: strAutorization
    } );

    if ( event.callback ) {

      event.callback( event );

    }

  }

  render() {

    const result = [];

    this.props.frontend.modalStack.forEach( ( modalInfo ) => {

      if ( modalInfo.title && modalInfo.message ) {

        if ( modalInfo.code === "NOTIFICATION" ) {

          const buttons = (

            <CButton
              className="ml-2 box-shadow-none"
              color="primary"
              onClick={ ( event ) => {

                event.modalId = modalInfo.id;
                event.callback = modalInfo.callback;
                this.onClickButtonCloseModal( event );

              } }
            >
              <FontAwesomeIcon icon="times" />
              <span className="ml-2">
                Close
              </span>
            </CButton>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }
        else if ( modalInfo.code === "NO_RESPONSE_FROM_SERVER" ) {

          const buttons = (

            <React.Fragment>

              <CButton
                className="ml-2 box-shadow-none"
                color="primary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.modalTag = modalInfo.tag;
                  event.callback = modalInfo.callback;
                  this.onClickButtonCheckAgainNRFSModal( event );

                } }
              >
                <FontAwesomeIcon icon="sync" />
                <span className="ml-2">
                  Check again
                </span>
              </CButton>

            </React.Fragment>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }
        else if ( modalInfo.code === "LOGOUT_QUESTION" ) {

          //const buttons = this.props.frontend.modalButtons; //From another react module

          const buttons = (

            <React.Fragment>

              <CButton
                className="ml-2 box-shadow-none"
                color="secondary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.callback = modalInfo.callback;
                  this.onClickButtonLogoutModalYes( event );

                } }
              >
                <FontAwesomeIcon icon="check" />
                <span className="ml-2">
                  Yes
                </span>
              </CButton>

              <CButton
                className="ml-2 box-shadow-none"
                color="primary"
                onClick={ ( event ) => {

                  event.modalId = modalInfo.id;
                  event.callback = modalInfo.callback;
                  this.onClickButtonCloseModal( event );

                } }
              >
                <FontAwesomeIcon icon="times" />
                <span className="ml-2">
                  No
                </span>
              </CButton>

            </React.Fragment>

          );

          result.push(

            <MessageModal
              showMe={ modalInfo.showMe }
              key={ modalInfo.id }
              title={ modalInfo.title }
              message={ modalInfo.message }
              buttons={ buttons }
            />

          );

        }

      }

    } );


    /*
    const showMessage = !!( this.props.frontend.modalCode && this.props.frontend.modalTitle && this.props.frontend.modalMessage );

    if ( showMessage && this.props.frontend.modalCode === "NOTIFICATION" ) {

      const buttons = (

        <CButton
          className="ml-2 box-shadow-none"
          color="primary"
          onClick={ this.onClickButtonCloseModal }
        >
          <FontAwesomeIcon icon="times" />
          <span className="ml-2">
            Close
          </span>
        </CButton>

      );

      result = (

        <MessageModal
          showMe={ showMessage }
          title={ this.props.frontend.modalTitle }
          message={ this.props.frontend.modalMessage }
          buttons={ buttons }
        />

      );

    }
    else if ( showMessage && this.props.frontend.modalCode === "NO_RESPONSE_FROM_SERVER" ) {

      const buttons = (

        <React.Fragment>

          <CButton
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ this.onClickButtonCheckAgainNRFSModal }
          >
            <FontAwesomeIcon icon="sync" />
            <span className="ml-2">
              Check again
            </span>
          </CButton>

        </React.Fragment>

      );

      result = (

        <MessageModal
          showMe={ showMessage }
          title={ this.props.frontend.modalTitle }
          message={ this.props.frontend.modalMessage }
          buttons={ buttons }
        />

      );

    }
    else if ( showMessage && this.props.frontend.modalCode === "LOGOUT_QUESTION" ) {

      //const buttons = this.props.frontend.modalButtons; //From another react module

      const buttons = (

        <React.Fragment>

          <CButton
            className="ml-2 box-shadow-none"
            onClick={ this.onClickButtonLogoutModalYes }
          >
            <FontAwesomeIcon icon="check" />
            <span className="ml-2">
              Yes
            </span>
          </CButton>

          <CButton
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ this.onClickButtonCloseModal }
          >
            <FontAwesomeIcon icon="times" />
            <span className="ml-2">
              No
            </span>
          </CButton>

        </React.Fragment>

      );

      result = (

        <MessageModal
          showMe={ showMessage }
          title={ this.props.frontend.modalTitle }
          message={ this.props.frontend.modalMessage }
          buttons={ buttons }
        />

      );

    }
    */

    return result.length > 0 ? ( result ) : null;

  }

}

ModalManager.propTypes = propTypes;
ModalManager.defaultProps = defaultProps;

const mapDispatchToProps = {
  closeModalMessage,
  tokenCheck,
  logout
};

const mapStateToProps = ( state ) => {

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( ModalManager );

export default connectedComponent;
