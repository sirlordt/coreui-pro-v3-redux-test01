import React, {
  Component
} from "react";
import {
  createPortal
} from "react-dom";
import {
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";
import {
  CButton
} from "@coreui/react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import PropTypes from "prop-types";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import {
  changeLanguage,
  closeModal
} from "../../redux/actions";

const propTypes = {

  children: PropTypes.node

};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class ChangeLanguageModal extends Component {

  constructor( props ) {

    super( props );

    // We create an element div for this modal
    this.element = document.createElement( "div" );

  }

  // We append the created div to the div#modal
  componentDidMount() {

    modalRoot.appendChild( this.element );

  }

  /**
    * We remove the created div when this Modal Component is unmounted
    * Used to clean up the memory to avoid memory leak
    */
  componentWillUnmount() {

    modalRoot.removeChild( this.element );

  }

  onClickButtonChangeLanguage = ( event ) => {

    event && event.preventDefault();

    //

  }

  onClickButtonCancel = ( event ) => {

    event && event.preventDefault();

    this.props.closeModal( {

      transactionId: event.modalId

    } );

    if ( event.modalCallback ) {

      event.modalCallback( event );

    }

  }

  render() {

    return createPortal( (

      <Modal
        isOpen={ this.props.showMe }
        className={ this.props.frontend.themeDark ? "no-c-app c-app c-dark-theme" : "no-c-app c-app" }
        toggle={ ( event ) => {

          event.modalId = this.props.modalId;
          event.modalCallback = this.props.modalCallback;
          event.modalTag = this.props.modalTag;

          this.onClickButtonCancel( event );

        } }
      >

        <ModalHeader
          toggle={ ( event ) => {

            event.modalId = this.props.modalId;
            event.modalCallback = this.props.modalCallback;
            event.modalTag = this.props.modalTag;

            this.onClickButtonCancel( event );

          } }
        >

          Change Language

        </ModalHeader>

        <ModalBody>

          Here going a list a languages

        </ModalBody>

        <ModalFooter>

          <CButton
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ ( event ) => {

              event.modalId = this.props.modalId;
              event.modalCallback = this.props.modalCallback;
              event.modalTag = this.props.modalTag;

              this.onClickButtonChangeLanguage( event );

            } }
          >

            <FontAwesomeIcon icon="language" />

            <span className="ml-2">

              Change language

            </span>

          </CButton>

          <CButton
            className="ml-2 box-shadow-none"
            color="secondary"
            onClick={ ( event ) => {

              event.modalId = this.props.modalId;
              event.modalCallback = this.props.modalCallback;
              event.modalTag = this.props.modalTag;

              this.onClickButtonCancel( event );

            } }
          >

            <FontAwesomeIcon icon="times" />

            <span className="ml-2">

              Cancel

            </span>

          </CButton>

        </ModalFooter>

      </Modal>

    ), this.element );

  }

}

ChangeLanguageModal.propTypes = propTypes;
ChangeLanguageModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  changeLanguage,
  closeModal
};

const mapStateToProps = ( state ) => {

  return {

    //authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( ChangeLanguageModal );

export default withRouter( connectedComponent );
