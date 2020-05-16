/* eslint-disable no-unused-vars */
import React, {
  Component,
  Suspense
} from "react";
import {
  connect
} from "react-redux";
import classNames from "classnames";
import {
  CFooter, CHeader
} from "@coreui/react";
import Loading from "../loading";

import {
  toggleDark
} from "../../redux/actions";

//export const Context = React.createContext( { show: false } );

const Header = React.lazy( () => import( "../header" ) );
const Footer = React.lazy( () => import( "../footer" ) );

const LeftSidebar = React.lazy( () => import( "../leftSidebar" ) );
//const PublicRightSidebar = React.lazy( () => import( "../rightSidebar" ) );

class Home extends Component {

  constructor( props ) {

    super( props );

    //this.c = {};

    //this.toggleTheme = this.toggleTheme.bind( this );
    //this.toggleLeftSidebar = this.toggleLeftSidebar.bind( this );
    //this.toggleLeftSidebarMobile = this.toggleLeftSidebarMobile.bind( this );
    //this.minimizeLeftSidebar = this.minimizeLeftSidebar.bind( this );
    //this.closeLeftSidebar = this.closeLeftSidebar.bind( this );

    //this.toggleRightSidebar = this.toggleRightSidebar.bind( this );
    //this.getToggleRightSidebarCallback = this.getToggleRightSidebarCallback.bind( this );

    /*
    this.state = {
      themeDark: false,
      isLeftSidebarOpen: "responsive",
      isLeftSidebarMinimized: false,
      sidebarMobile: false,
      sidebarDisplay: "sm",
      isRightSidebarOpen: false
    };
    */

    this.state = {

      isLoading: false

    };

  }

  async componentDidMount() {

    /*
    setTimeout( () => {

      this.setState( ( prevState ) => ( {

        isLoading: !prevState.isLoading

      } ) );

    }, 2000 );
    */

  }

  shouldComponentUpdate( nextProps, nextState ) {

    /*
    if (this.props.color !== nextProps.color) {
      return true;
    }

    if (this.state.isRightSidebarOpen !== nextState.isRightSidebarOpen) {
      return false;
    }*/
    return true;

  }

  //loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse" /></div>;

  /*
  Moved to redux
  toggleLeftSidebar( display, mobile ) {

    //alert('sidebar');
    const leftSidebarOpened = this.state.isLeftSidebarOpen === true || this.state.isLeftSidebarOpen === "responsive";
    console.log( leftSidebarOpened );
    this.setState( {
      isLeftSidebarOpen: leftSidebarOpened ? false : "responsive"
    } );

  }

  toggleLeftSidebarMobile( display, mobile ) {

    const leftSidebarClosed = this.state.isLeftSidebarOpen === "responsive" || this.state.isLeftSidebarOpen === false;
    this.setState( {
      isLeftSidebarOpen: leftSidebarClosed ? true : "responsive"
    } );

  }
  */

  /*
  Moved to redux
  minimizeLeftSidebar() {

    this.setState( ( prevState ) => ( {
      isLeftSidebarMinimized: !prevState.isLeftSidebarMinimized
    } ) );

    / *
    this.setState( {
      isSidebarMinimized: !this.state.isSidebarMinimized,
    } );
    * /

  }
  */

  /* Moved to redux
  closeLeftSidebar() {

    console.log( "closeLeftSidebar" );
    this.setState( {
      isLeftSidebarOpen: "responsive"
    } );

  }
  */

  /*
  Moved to redux
  getToggleRightSidebarCallback( callback ) {

    console.log( "getToggleRightSidebarCallback" );
    this.toggleRightSidebarCallback = callback;

  }

  toggleRightSidebar() {

    console.log( "toggleRightSidebar" );
    this.toggleRightSidebarCallback && this.toggleRightSidebarCallback();

  }
  */

  /*
  Moved to redux
  toggleTheme() {

    / *
    this.setState( ( prevState ) => ( {
      themeDark: !prevState.themeDark
    } ) );
    * /

    this.props.toggleDark();

    / *
    this.setState( {
      themeDark: !this.state.themeDark,
    } );
    * /

  }
  */

  render() {

    let result = null;

    // dark theme
    const classes = classNames(
      "c-app c-default-layout",
      this.props.frontend.themeDark ? "c-dark-theme" : false
      //this.state.themeDark ? "c-dark-theme" : false
    );

    if ( this.state.isLoading ) {

      result = ( <Loading /> );

    }
    else {

      result = (

        <div className={ classes }>
          <LeftSidebar />
          {/*
          <PublicRightSidebar
            sidebarShow={ this.state.isRightSidebarOpen }
            toggleSidebar={ this.toggleRightSidebar }
            getToggleSidebarCallback={ this.getToggleRightSidebarCallback }
          />
          */}
          <div className="c-wrapper">
            <CHeader withSubheader>
              <Suspense fallback={ <Loading /> }>
                <Header />
              </Suspense>
            </CHeader>
            <div className="c-body">
              <Suspense fallback={ <Loading /> }>
                <Loading />
                {/*<DefaultContent />*/}
              </Suspense>
            </div>
            <CFooter className="d-sm-flex justify-content-center" fixed>
              <Suspense fallback={ <Loading /> }>
                <Footer />
              </Suspense>
            </CFooter>
          </div>
        </div>

      );

    }

    return result;

  }

}

const mapDispatchToProps = {
  toggleDark
};

const mapStateToProps = ( state ) => {

  console.log( "Header State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( Home );

export default connectedComponent;

//export default Home;
