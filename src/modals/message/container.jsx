import React, {
  Component
} from "react";
import {
  createPortal
} from "react-dom";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter
  //CButton
} from "@coreui/react";
/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

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

    //console.log( this.props.show );

    return createPortal( (

      <CModal
        show={ this.props.showMe }
        onClose={ this.onClickButtonClose }
        //closeOnBackdrop={ false }
        //backdrop={ false }
        //size="md"
      >

        <CModalHeader closeButton>

          <CModalTitle>{ this.props.title }</CModalTitle>

        </CModalHeader>

        <CModalBody>

          { this.props.message }

        </CModalBody>

        <CModalFooter>

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

        </CModalFooter>

      </CModal>
    ), this.element );

  }

}

export default MessageModal;
