import React, {
  Component
  //Suspense
} from "react";
import {
  withRouter
} from "react-router-dom";
import {
  connect
} from "react-redux";
//import { NavLink } from 'react-router-dom';
//import * as router from 'react-router-dom';
import PropTypes from "prop-types";
import {
  CButton,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  //CHeaderNavItem,
  //CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter
  //CLink
} from "@coreui/react";
/*
import {
  CIcon
} from "@coreui/icons-react";
*/
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
// routes config
import routes from "../../routes";

//import PublicHeaderDropdown from "../headerDropdown";

import logo from "../../assets/img/brand/coreui-pro-base.svg";
//import sygnet from '../../assets/img/brand/coreui-signet.svg'

import {
  toggleDark,
  toggleLeftSidebar,
  toggleLeftSidebarMobile,
  toggleRightSidebar,
  tokenCheck,
  logout,
  showModalMessage,
  closeModalMessage
} from "../../redux/actions";
import SystemUtils from "../../utils/systemUtils";
//import MessageModal from "../../modals/message/container";

//const LoginModal = React.lazy( () => import( "../loginModal" ) );

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Header extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4()
      //isAuthenticated: false,
      /*
      modalCode: "",
      title: "",
      message: ""
      */

    };

  }

  shouldComponentUpdate( nextProps ) {

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        /*
        this.setState( {
          modalCode: "NOTIFICATION",
          title: "No response from server",
          message: strMessage
        } );
        */

        this.props.showModalMessage( {
          modalId: this.state.id,
          modalCode: "NO_RESPONSE_FROM_SERVER",
          modalTitle: "No response from server",
          modalMessage: strMessage,
          modalTag: "forceCheckToken"
        } );


      }
      else if ( strCode === "SUCCESS_LOGOUT" ) {

        /*
        this.setState( {
          modalCode: "NOTIFICATION",
          title: "Success logout",
          message: strMessage
        } );
        */

        this.props.showModalMessage( {
          modalId: this.state.id,
          modalCode: "NOTIFICATION",
          modalTitle: "Success logout",
          modalMessage: strMessage
        } );

        this.props.history.replace( {
          pathname: "/home"
        } );

      }
      else { //Other errors

        this.props.showModalMessage( {
          modalId: this.state.id,
          modalCode: "NOTIFICATION",
          modalTitle: "Error",
          modalMessage: strMessage
        } );

        /*
        this.setState( {
          modalCode: "NOTIFICATION",
          title: "Error",
          message: strMessage
        } );
        */

      }

    }

    return true;

  }

  async componentDidMount() {

    //

  }

  onClickButtonLogout = ( event ) => {

    event && event.preventDefault();

    /*
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
          onClick={ this.onClickButtonModalClose }
        >
          <FontAwesomeIcon icon="times" />
          <span className="ml-2">
            No
          </span>
        </CButton>

      </React.Fragment>

    );
    */

    this.props.showModalMessage( {
      modalId: this.state.id,
      modalCode: "LOGOUT_QUESTION",
      modalTitle: "Logout",
      modalMessage: "Are you sure do you want logout?"
      //modalButtons: buttons
    } );

    /*
    this.setState( {
      showMessage: true,
      modalCode: "LOGOUT_QUESTION",
      title: "Logout",
      message: "Are you sure do you want logout?"
    } );
    */

  }

  /*
  onClickButtonLogoutModalYes = ( event ) => {

    event && event.preventDefault();

    const strUsername = this.props.authentication.active;
    const strAutorization = this.props.authentication.accounts[ this.props.authentication.active ].Authorization;

    this.props.logout( {
      transactionId: this.state.id,
      username: strUsername,
      authorization: strAutorization
    } );

  }

  onClickButtonModalClose = ( event ) => {

    event && event.preventDefault();

    this.props.closeModalMessage( {
      transactionId: this.state.id
    } );

  }
  */

  render() {

    const isAuthenticated = !!( this.props.authentication.active );

    /*
    const showMessage = !!( this.state.modalCode && this.state.title && this.state.message );

    let buttons = null;

    if ( this.state.modalCode === "NOTIFICATION" ) {

      buttons = (

        <CButton
          className="ml-2 box-shadow-none"
          color="primary"
          onClick={ this.onClickButtonModalClose }
        >
          <FontAwesomeIcon icon="times" />
          <span className="ml-2">
            Close
          </span>
        </CButton>

      );

    }
    else if ( this.state.modalCode === "LOGOUT_QUESTION" ) {

      buttons = (

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
            onClick={ this.onClickButtonModalClose }
          >
            <FontAwesomeIcon icon="times" />
            <span className="ml-2">
              No
            </span>
          </CButton>

        </React.Fragment>

      );

    }
    */

    return (

      <React.Fragment>

        {

          isAuthenticated ? (
            <React.Fragment>
              <CToggler
                inHeader
                className="ml-md-3 d-lg-none"
                onClick={ ( event ) => this.props.toggleLeftSidebarMobile( event ) }
              />
              <CToggler
                inHeader
                className="ml-3 d-md-down-none"
                onClick={ ( event ) => this.props.toggleLeftSidebar( event ) }
              />
            </React.Fragment>
          ) : null

        }

        {

          !isAuthenticated ? (
            <React.Fragment>

              <CHeaderBrand className="ml-2" to="/home">
                <img src={ logo } height="48" alt="Logo" />
              </CHeaderBrand>

              <div className="mx-auto" />

            </React.Fragment>
          ) : (
            <CHeaderBrand className="mx-auto d-lg-none" to="/home">
              <img src={ logo } height="48" alt="Logo" />
            </CHeaderBrand>
          )

        }

        {/* mx-auto d-lg-none
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/users">Users</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>Settings</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
        */}

        <CHeaderNav className="ml-lg-auto mr-2">

          {

            !isAuthenticated ? (

              <React.Fragment>

                <CButton
                  className="ml-2 box-shadow-none"
                  color="primary"
                  onClick={ () => {

                    //this.props.showModalLogin( event );
                    this.props.history.push( "/login" );

                  } }
                >
                  <FontAwesomeIcon icon="sign-in-alt" />
                  <span className="ml-2 d-sm-down-none">
                    Login
                  </span>
                </CButton>

                <CButton
                  className="ml-2 box-shadow-none"
                  color="success">
                  <FontAwesomeIcon icon="user-plus" />
                  <span className="ml-2 d-sm-down-none">
                    Signup
                  </span>
                </CButton>

              </React.Fragment>

            ) : (

              <React.Fragment>

                <CButton
                  className="ml-2 box-shadow-none"
                  color="primary"
                  onClick={ this.onClickButtonLogout }
                  /*
                  onClick={ () => {

                    //this.props.showModalLogin( event );
                    //this.props.history.push( "/logout" );

                  } }
                  */
                >
                  <FontAwesomeIcon icon="sign-out-alt" />
                  <span className="ml-2 d-sm-down-none">
                    Logout
                  </span>
                </CButton>

              </React.Fragment>

            )

          }

        </CHeaderNav>

        <CSubheader className="pl-3 justify-content-between*">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={ routes }
          />
          <CHeaderNav className="ml-auto mr-2">

            <CToggler
              inHeader
              className="ml-auto"
              onClick={ this.props.toggleDark }
              title="Toggle Light/Dark Mode"
            >
              <FontAwesomeIcon icon="moon" name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
              <FontAwesomeIcon icon="sun" name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />

              {/*
              <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
              <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
              */}
            </CToggler>

          </CHeaderNav>

          {/*
          <ul className="d-md-down-none mfe-2 c-subheader-nav ml-auto">
            <li className="c-subheader-nav-link">
              <CLink href="#">
                <CIcon name="cil-speech" alt="Settings" />
              </CLink>
            </li>
            <li className="c-subheader-nav-link">
              <CLink aria-current="page" href="#/dashboard">
                <CIcon name="cil-graph" alt="Dashboard" />
                {" "}
                Dashboard
              </CLink>
            </li>
            <li className="c-subheader-nav-link">
              <CLink href="#">
                <CIcon name="cil-settings" alt="Settings" />
                {" "}
                Settings
              </CLink>
            </li>
          </ul>
          */}
          {/*<CHeaderNav className="d-md-down-none mfe-2 c-subheader-nav">*/}
          {/*  <CHeaderNavItem className="c-subheader-nav-link">*/}
          {/*    <CIcon name="cil-speech" alt="Settings" />*/}
          {/*  </CHeaderNavItem>*/}
          {/*  <CHeaderNavItem to="/dashboard" className="c-subheader-nav-link">*/}
          {/*    <CIcon name="cil-graph" alt="Dashboard" /> Dashboard*/}
          {/*  </CHeaderNavItem>*/}
          {/*  <CHeaderNavItem className="c-subheader-nav-link">*/}
          {/*    <CIcon name="cil-settings" alt="Settings" /> Settings*/}
          {/*  </CHeaderNavItem>*/}
          {/*</CHeaderNav>*/}
        </CSubheader>
        {/*
        <MessageModal
          showMe={ showMessage }
          title={ this.state.title }
          message={ this.state.message }
          buttons={ buttons }
        />
        */}

      </React.Fragment>

    );

  }

}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapDispatchToProps = {
  toggleDark,
  toggleLeftSidebar,
  toggleLeftSidebarMobile,
  toggleRightSidebar,
  tokenCheck,
  logout,
  showModalMessage,
  closeModalMessage
};

const mapStateToProps = ( state ) => {

  //console.log( "Header State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Header );

export default withRouter( connectedComponent );

//export default Header;
