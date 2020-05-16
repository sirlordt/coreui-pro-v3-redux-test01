import React, {
  Component
  //Suspense
} from "react";
import {
  Link
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
import {
  CIcon
} from "@coreui/icons-react";

// routes config
//import routes from '../../routes';

//import PublicHeaderDropdown from "../headerDropdown";

import logo from "../../assets/img/brand/coreui-pro-base.svg";
//import sygnet from '../../assets/img/brand/coreui-signet.svg'

import {
  toggleDark,
  toggleLeftSidebar,
  toggleLeftSidebarMobile,
  toggleRightSidebar
} from "../../redux/actions";

import {
  showModalLogin
} from "../../redux/actions/modals";

//const LoginModal = React.lazy( () => import( "../loginModal" ) );

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class Header extends Component {

  render() {

    /*
    const {
      //toggleTheme,
      //toggleLeftSidebarMobile,
      //toggleLeftSidebar,
      //toggleRightSidebar
    } = this.props;
    */

    //const Authentication = this.props.Authentication; //Prop come from redux store

    //console.log( "Authentication => ", Authentication );

    return (

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
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon src={ logo } height="48" alt="Logo" />
        </CHeaderBrand>

        {/*
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
          {/*
          <PublicHeaderDropdown notif />
          <PublicHeaderDropdown tasks />
          <PublicHeaderDropdown mssgs />
          <PublicHeaderDropdown accnt />
          */}
          {/*
          <CToggler
            inHeader
            className=""
            onClick={ ( e ) => this.props.toggleRightSidebar( e ) }
          >
            <CIcon
              name="cil-applications-settings"
              size="lg"
            />
          </CToggler>
          */}
          {/*
          <CButton block>
            <CIcon
              name="cil-cogs"
              size="lg"
            />
          </CButton>
          */}
          <Link to="/login">
            <CButton
              className="ml-2"
              color="primary"
            >
              {/*
              onClick={ ( event ) => {

                this.props.showModalLogin( event );

              }*/}


              <CIcon
                name="cil-user"
                size="lg"
              />
              <span className="ml-2 d-sm-down-none">
                Login
              </span>
            </CButton>
          </Link>
          {/*
          <Suspense fallback={ null }>
            <LoginModal />
          </Suspense>
          */}
          <CButton className="ml-2" color="success">
            <CIcon
              name="cil-plus"
              size="lg"
            />
            <span className="ml-2 d-sm-down-none">
              Signup
            </span>
          </CButton>
          {/*
          <CToggler
            inHeader
            className=""
            onClick={ ( e ) => this.props.toggleRightSidebar( e ) }
          >
            <CIcon
              name="cil-applications-settings"
              size="lg"
            />
            <small className="ml-2 d-sm-down-none">
              Login
            </small>
          </CToggler>
          <CToggler
            inHeader
            className=""
            onClick={ ( e ) => this.props.toggleRightSidebar( e ) }
          >
            <CIcon
              name="cil-applications-settings"
              size="lg"
            />
            <small className="ml-2 d-sm-down-none">
              Signup
            </small>
          </CToggler>
          */}
          {/*
          <CToggler
            inHeader
            className="mr-md-3 d-lg-none"
            onClick={ ( e ) => toggleRightSidebar( e ) }
          >
            <CIcon
              name="cil-applications-settings"
              size="lg"
            />
          </CToggler>
          <CToggler
            inHeader
            className="mr-3 d-md-down-none"
            onClick={ ( e ) => toggleRightSidebar( e ) }
          >
            <CIcon
              name="cil-applications-settings"
              size="lg"
            />
          </CToggler>
          */}
        </CHeaderNav>

        <CSubheader className="pl-3 justify-content-between*">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={ [ {
              path: "/", exact: true, name: "Home"
            } ] }
          />
          <CHeaderNav className="ml-auto mr-2">

            <CToggler
              inHeader
              className="ml-auto"
              onClick={ this.props.toggleDark }
              title="Toggle Light/Dark Mode"
            >
              <CIcon name="cil-moon" className="c-d-dark-none" alt="CoreUI Icons Moon" />
              <CIcon name="cil-sun" className="c-d-default-none" alt="CoreUI Icons Sun" />
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
  showModalLogin
};

const mapStateToProps = ( state ) => {

  //console.log( "Header State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend,
    modal: state.modal
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Header );

export default connectedComponent;

//export default Header;
