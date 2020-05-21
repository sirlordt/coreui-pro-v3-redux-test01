import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import classNames from "classnames";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CLabel,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInvalidFeedback,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert
} from "@coreui/react";
/*
import {
  CIcon
} from "@coreui/icons-react";
*/
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import logo from "../../assets/img/brand/coreui-pro-base.svg";

class Login extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      fieldUserNameInvalid: true,
      fieldUsernameMessage: "", //"Username field is required",
      fieldPasswordInvalid: true,
      fieldPasswordMessage: "", //"Password field is required",
      fieldPasswordShowContent: false,
      mainMessageIsError: false,
      mainMessage: "" //"Very super long message and very descriptive message with long long text and wrap"

    };

  }

  render() {

    // dark theme
    const classes = classNames(
      "c-app c-default-layout flex-row align-items-start pt-3",
      this.props.frontend.themeDark ? "c-dark-theme" : false
      //this.state.themeDark ? "c-dark-theme" : false
    );

    return (
      <div className={ classes }>
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md="5">
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody className="p-0">
                    <CForm>
                      <CFormGroup className="mb-0 d-flex justify-content-center">
                        <img src={ logo } height="100" alt="Logo" />
                      </CFormGroup>
                      <CFormGroup className="mb-0">
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                      </CFormGroup>
                      <CFormGroup className="mb-0">
                        <CLabel htmlFor="username">Username</CLabel>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <FontAwesomeIcon icon="user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            invalid={ this.state.fieldUserNameInvalid }
                            className="box-shadow-none"
                            type="text"
                            id="username"
                            placeholder="Username"
                            autoComplete="username" />
                        </CInputGroup>
                        <CInvalidFeedback style={ {
                          display: "block",
                          height: "1.5em"
                        } }>
                          { this.state.fieldUsernameMessage ? this.state.fieldUsernameMessage : "" }
                        </CInvalidFeedback>
                      </CFormGroup>
                      <CFormGroup className="mb-0">
                        <CRow className="m-0">
                          <CCol xs="4" className="pl-0 pr-0">
                            <CLabel
                              className="mb-0"
                              style={ {
                                padding: "0.375rem 0"
                              } }
                              htmlFor="password">
                              Password
                            </CLabel>
                          </CCol>
                          <CCol xs="8" className="pl-2 pr-0 text-right">
                            <CButton id="buttonForgotPassword" color="link" className="px-0">Forgot your password?</CButton>
                          </CCol>
                        </CRow>
                        <CInputGroup>
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <FontAwesomeIcon icon="lock" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            invalid={ this.state.fieldPasswordInvalid }
                            className="box-shadow-none field-password"
                            type={ this.state.fieldPasswordShowContent ? "text" : "password" }
                            placeholder="Password"
                            autoComplete="current-password" />
                          <CButton
                            id="buttonShowPassword"
                            color="link"
                            className="position-absolute btn-show-password"
                          >
                            <FontAwesomeIcon icon="eye" />
                          </CButton>

                        </CInputGroup>
                        <CInvalidFeedback style={ {
                          display: "block",
                          height: "1.5em"
                        } }>
                          { this.state.fieldPasswordMessage ? this.state.fieldPasswordMessage : "" }
                        </CInvalidFeedback>
                      </CFormGroup>
                      {
                        this.state.mainMessage ?
                          (
                            <CFormGroup className="mb-2">
                              <CAlert
                                color={ this.state.mainMessageIsError ? "danger" : "success" }
                                className="text-center m-0 p-0"
                                style={ {
                                  height: "3.5rem"
                                } }>
                                this.state.mainMessage
                              </CAlert>
                            </CFormGroup>
                          ) :
                          (
                            null
                          )
                      }

                      <CFormGroup className="mb-2">
                        <CButton
                          className="w-100 box-shadow-none"
                          color="primary">
                          <FontAwesomeIcon icon="sign-in-alt" />
                          <span className="px-2 m-0">
                            Login
                          </span>
                        </CButton>
                      </CFormGroup>
                      <CFormGroup className="mb-2">
                        <CButton
                          className="w-100 box-shadow-none"
                          color="success">
                          <FontAwesomeIcon icon="user-plus" />
                          <span className="px-2 m-0">
                            Signup
                          </span>
                        </CButton>
                      </CFormGroup>
                      <CFormGroup className="mb-2">
                        <CButton
                          className="w-100 box-shadow-none"
                          color="secondary">
                          <FontAwesomeIcon icon="home" />
                          <span className="px-2 m-0">
                            Go to home
                          </span>
                        </CButton>
                      </CFormGroup>
                      <CFormGroup className="mb-2">
                        <p className="text-muted text-center m-0">Or Sign In with</p>
                      </CFormGroup>
                      <CFormGroup className="mb-1 d-flex justify-content-center">
                        <CButton className="btn-facebook box-shadow-none btn-brand mr-3">
                          <FontAwesomeIcon icon={ [ "fab", "facebook" ] } />
                        </CButton>
                        <CButton className="btn-twitter box-shadow-none btn-brand mr-3">
                          <FontAwesomeIcon icon={ [ "fab", "twitter" ] } />
                        </CButton>
                        <CButton className="btn-youtube box-shadow-none btn-brand">
                          <FontAwesomeIcon icon={ [ "fab", "google" ] } />
                        </CButton>
                      </CFormGroup>
                      <CFormGroup className="m-0">
                        <p className="text-muted text-center m-0 mt-4">Copyright 2020 Company</p>
                      </CFormGroup>
                    </CForm>
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    );

  }

}

const mapDispatchToProps = {};

const mapStateToProps = ( state ) => {

  //console.log( "Home State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Login );

export default connectedComponent;

//export default Login;
