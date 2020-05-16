/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-did-update-set-state */
import React, {
  Component
} from "react";
import ReactDOM from "react-dom";
import {
  connect
} from "react-redux";
import {
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInput,
  CButton
} from "@coreui/react";
import {
  CIcon
} from "@coreui/icons-react";
import PropTypes from "prop-types";

import {
  login
} from "../../redux/actions";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class LoginModal extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      Username: "",
      Password: ""
      //Message: ""

    };

  }

  /*
  componentDidUpdate( prevProps ) {

    const {
      activeUsername,
      errorDetails
    } = this.props.authentication;

    if ( errorDetails !== prevProps.errorDetails ) {

      // Check for login error
      if ( errorDetails.Code === "LOGIN_FAIL" ) {

        this.setState( {

          messsage: errorDetails.Message

        } );

      }
      else {

        this.setState( {

          message: null

        } );

      }

    }

    // If authenticated, close modal
    if ( this.state.modals.modal ) {

      if ( activeUsername ) {

        this.toggle();

      }

    }

  }
  */

  onChange = ( event ) => {

    this.setState( {

      [ event.target.name ]: event.target.value

    } );

  };

  onCloseModal = () => {

    // Clear errors
    //this.props.clearErrors();

    /*
    this.setState( {

      modal: !this.state.modal

    } );
    */

    //console.log( "toogle" );
    //this.props.hideModalLogin();

    if ( this.props.history.action !== "POP" ) {

      this.props.history.goBack();

    }
    else {

      this.props.history.push( "/home" );

    }

  };

  onClickButtonLogin = ( event ) => {

    //console.log( "onButtonLoginClick" );

    event.preventDefault();

    //this.props.hideModalLogin();

    this.props.login( {
      Username: this.state.Username,
      Password: this.state.Password
    } );

    //console.log( "Login Modal State =>", this.props.authentication );

    //console.log( this.props.modals );

    /*
    this.setState( {
      state: this.state
    } );
    */

    /*
    const {
      username,
      password
    } = this.state;

    const loginRequestData = {
      username,
      password
    };

    // Attempt to login
    this.props.login( loginRequestData );
    */

  };

  onClickButtonCancel = ( event ) => {

    //console.log( "onButtonCancelClick" );

    event.preventDefault();

    if ( this.props.history.action !== "POP" ) {

      this.props.history.goBack();

    }
    else {

      this.props.history.push( "/home" );

    }

    //this.props.hideModalLogin();

    //console.log( this.props.modals );

    /*
    this.setState( {
      state: this.state
    } );
    */

    /*
    const {
      username,
      password
    } = this.state;

    const loginRequestData = {
      username,
      password
    };

    // Attempt to login
    this.props.login( loginRequestData );
    */

  };

  render() {

    //show={ this.props.modal.show.includes( "SHOW_MODAL_LOGIN" ) }
    let result = null;

    const bShowError = this.props.authentication.errors &&
                       this.props.authentication.errors.length > 0 &&
                       this.props.authentication.errors[ 0 ].Message;

    result = (

      <div>

        <CModal
          show
          onClose={ this.onCloseModal }
          closeOnBackdrop={ false }
        >

          <CModalHeader closeButton>

            <CModalTitle>Login</CModalTitle>

          </CModalHeader>

          <CModalBody>

            <CForm>

              <CFormGroup>

                <CInputGroup>

                  <CInputGroupPrepend>

                    <CInputGroupText>

                      <CIcon name="cil-user" />

                    </CInputGroupText>

                  </CInputGroupPrepend>

                  <CInput
                    id="Username"
                    name="Username"
                    placeholder="Username"
                    autoComplete="name"
                    onChange={ this.onChange }
                  />

                </CInputGroup>

              </CFormGroup>

              <CFormGroup>

                <CInputGroup>

                  <CInputGroupPrepend>

                    <CInputGroupText>

                      <CIcon name="cil-asterisk" />

                    </CInputGroupText>

                  </CInputGroupPrepend>

                  <CInput
                    type="password"
                    id="Password"
                    name="Password"
                    placeholder="Password"
                    autoComplete="current-password"
                    onChange={ this.onChange }
                  />

                </CInputGroup>

              </CFormGroup>
              {
                bShowError && (
                  <CAlert className="mb-0 text-center" color="danger">
                    {this.props.authentication.errors[ 0 ].Message}
                  </CAlert>
                )
              }

              {/*
              <CFormGroup className="form-actions">

                <CButton
                  type="submit"
                  //size="sm"
                  color="success">
                  Login
                </CButton>

              </CFormGroup>
               */}

            </CForm>

            {/*
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={ this.onSubmit }>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={ this.onChange }
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={ this.onChange }
                />
                <Button
                  color="dark"
                  style={ {
                    marginTop: "2rem"
                  } }
                  block>
                  Login
                </Button>
              </FormGroup>
            </Form>
            */}
          </CModalBody>
          <CModalFooter>

            <CButton color="primary" onClick={ this.onClickButtonLogin }>Login</CButton>
            <CButton color="secondary" onClick={ this.onClickButtonCancel }>Cancel</CButton>

          </CModalFooter>

        </CModal>

      </div>

    );

    return ReactDOM.createPortal( result, document.getElementById( "modal-root" ) );

  }

}

LoginModal.propTypes = propTypes;
LoginModal.defaultProps = defaultProps;

const mapDispatchToProps = {
  login
};

const mapStateToProps = ( state ) => {

  //console.log( "LoginModal State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend,
    modal: state.modal
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( LoginModal );

export default connectedComponent;
