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
/*
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
  //CButton
} from "@coreui/react";
*/

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import PropTypes from "prop-types";
/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

const modalRoot = document.getElementById( "modal-root" );

class MessageModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      show: true

    };

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

  onClickButtonClose = ( event ) => {

    /*
    this.setState( {
      show: false
    } );
    */

    if ( this.props.onClickButtonClose ) {

      this.props.onClickButtonClose( event );

    }

  }

  render() {

    //console.log( this.props.show ); <div className={ this.props.frontend.themeDark ? "c-app c-dark-theme" : "c-app" }>

    return createPortal( (

      <Modal
        isOpen={ this.props.showMe }
        toggle={ this.onClickButtonClose }
        className={ this.props.frontend.themeDark ? "no-c-app c-app c-dark-theme" : "no-c-app c-app" }
        //closeOnBackdrop={ false }
        //backdrop={ false }
        //size="md"
      >

        <ModalHeader toggle={ this.onClickButtonClose }>

          { this.props.title }

        </ModalHeader>

        <ModalBody>

          { this.props.message }

        </ModalBody>

        <ModalFooter>

          { /*
          <CButton
            //disabled={ this.state.buttonLoginDisabled }
            className="ml-2 box-shadow-none"
            color="primary"
            onClick={ this.onClickButtonClose }
          >
            <FontAwesomeIcon icon="times" />
            <span className="ml-2">
              Close
            </span>
          </CButton>
          */}

          { this.props.buttons }

        </ModalFooter>

      </Modal>

    ), this.element );

  }

}

MessageModal.propTypes = propTypes;
MessageModal.defaultProps = defaultProps;

const mapDispatchToProps = {};

const mapStateToProps = ( state ) => {

  return {

    authentication: state.authentication,
    frontend: state.frontend

  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( MessageModal );

export default withRouter( connectedComponent );

//export default MessageModal;
