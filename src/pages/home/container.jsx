import React, {
  Component,
  Suspense
} from "react";
import {
  connect
} from "react-redux";
import classNames from "classnames";
import PropTypes from "prop-types";
import {
  CFooter,
  CHeader,
  CButton

} from "@coreui/react";
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";

import Loading from "../../components/loading";

import {
  toggleDark,
  tokenCheck,
  resetActiveUser
} from "../../redux/actions";
import SystemUtils from "../../utils/systemUtils";
import MessageModal from "../../modals/message/container";

//export const Context = React.createContext( { show: false } );

const Header = React.lazy( () => import( "../../components/header" ) );
const Footer = React.lazy( () => import( "../../components/footer" ) );

const LeftSidebar = React.lazy( () => import( "../../components/leftSidebar" ) );
//const PublicRightSidebar = React.lazy( () => import( "../../components/rightSidebar" ) );

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class HomePage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      isLoading: false,
      isAuthenticated: false,
      isError: false,
      showMessage: false,
      message: ""

    };

  }

  shouldComponentUpdate( nextProps ) {

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        this.setState( {
          isError: true,
          showMessage: true,
          message: strMessage
        } );

      }
      else if ( strCode === "SUCCESS_TOKEN_IS_VALID" ) {

        //this.props.history.push( "/home" );
        this.setState( {
          isAuthenticated: true,
          isError: false,
          showMessage: false,
          message: strMessage
        } );

      }
      else if ( strCode === "ERROR_EXPIRED_AUTHORIZATION_TOKEN" ) {

        this.props.resetActiveUser( {
          username: this.props.authentication.active
        } );

        this.setState( {
          isAuthenticated: false,
          isError: false,
          showMessage: false,
          message: ""
        } );

      }
      else {

        this.setState( {
          isAuthenticated: false,
          isError: true,
          showMessage: false,
          message: strMessage
        } );

      }

    }

    return true;

  }

  tokenCheck = () => {

    const intTokenCheck = SystemUtils.tokenCheckIsNeeded( this.props.authentication );

    if ( intTokenCheck === 0 ) { //No authentication

      this.setState( {
        isAuthenticated: false,
        isError: false,
        message: ""
      } );

    }
    else if ( intTokenCheck === 1 ) { //Check needed

      //Launch token check
      this.props.tokenCheck( {
        transactionId: this.state.id,
        authorization: this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
        logger: null
      } );

    }
    else if ( intTokenCheck === 2 ) { //Authenticaticated but no check needed

      this.setState( {
        isAuthenticated: true,
        isError: false,
        message: ""
      } );

    }
    else if ( intTokenCheck === -1 ) { //Invalid status state. Reset the state

      this.props.resetActiveUser( {
        username: this.props.authentication.active
      } );

      this.setState( {
        isAuthenticated: false,
        isError: false,
        showMessage: false,
        message: ""
      } );

    }

  }

  async componentDidMount() {

    setInterval( () => {

      this.tokenCheck();

    }, 10000 );

    this.tokenCheck();

  }

  onClickButtonCloseModal = ( event ) => {

    event && event.preventDefault();

    this.tokenCheck();

  }

  render() {

    //console.log( "authentication:", this.props.authentication );

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

      const buttons = (

        <CButton
          //disabled={ this.state.buttonLoginDisabled }
          className="ml-2 box-shadow-none"
          color="primary"
          onClick={ this.onClickButtonCloseModal }
        >
          <FontAwesomeIcon icon="sync" />
          <span className="ml-2">
            Check again
          </span>
        </CButton>

      );

      result = (

        <div className={ classes }>
          {
            this.state.isAuthenticated ? <LeftSidebar /> : null
          }
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
          { /*moment().tz( CommonUtilities.getCurrentTimeZoneId() ).subtract( 10, "minutes" ).format()*/ }
          <MessageModal
            showMe={ !!( this.state.showMessage && this.state.message ) }
            title={ this.state.isError ? "Error" : "Message" }
            message={ this.state.message }
            buttons={ buttons }
            onClickButtonClose={ this.onClickButtonCloseModal }
          />
        </div>

      );

    }

    return result;

  }

}

HomePage.propTypes = propTypes;
HomePage.defaultProps = defaultProps;

const mapDispatchToProps = {
  tokenCheck,
  resetActiveUser,
  toggleDark
};

const mapStateToProps = ( state ) => {

  //console.log( "Home State => ", state );

  return {
    authentication: state.authentication,
    frontend: state.frontend
  };

};

const connectedWrapper = connect( mapStateToProps, mapDispatchToProps );

const connectedComponent = connectedWrapper( HomePage );

export default connectedComponent;

//export default Home;
