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
  CHeader
  //CButton
} from "@coreui/react";
/*
import {
  FontAwesomeIcon
} from "@fortawesome/react-fontawesome";
*/

import Loading from "../../components/loading";

import {
  toggleDark,
  tokenCheck,
  resetActiveUser,
  deleteResult,
  showModalMessage,
  closeModalMessage
} from "../../redux/actions";

import SystemUtils from "../../utils/systemUtils";
//import MessageModal from "../../modals/message/container";
import Content from "../content";

//export const Context = React.createContext( { show: false } );

const Header = React.lazy( () => import( "../../components/header" ) );
const Footer = React.lazy( () => import( "../../components/footer" ) );

const LeftSidebar = React.lazy( () => import( "../../components/leftSidebar" ) );
//const PublicRightSidebar = React.lazy( () => import( "../../components/rightSidebar" ) );

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

let intervalHandler = null;

class HomePage extends Component {

  constructor( props ) {

    super( props );

    this.state = {

      id: SystemUtils.getUUIDv4(),
      isLoading: false,
      modalCode: "",
      title: "",
      message: ""

    };

  }

  shouldComponentUpdate( nextProps ) {

    if ( this.props.authentication.results[ this.state.id ]?.mark !== nextProps.authentication.results[ this.state.id ]?.mark ) {

      const strCode = nextProps.authentication.results[ this.state.id ].data.Code;
      const strMessage = nextProps.authentication.results[ this.state.id ].data.Message;

      if ( strCode === "NO_RESPONSE_FROM_SERVER" ) {

        /*
        this.setState( {
          modalCode: "NO_RESPONSE_FROM_SERVER",
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
      else if ( strCode === "SUCCESS_TOKEN_IS_VALID" ) {

        this.props.closeModalMessage( {
          transactionId: this.state.id,
          clearModalCode: "NO_RESPONSE_FROM_SERVER"
        } );

        /*
        this.setState( {
          modalCode: "",
          title: "",
          message: ""
        } );
        */

      }
      else {

        //ERROR_EXPIRED_AUTHORIZATION_TOKEN
        //ERROR_INVALID_AUTHORIZATION_TOKEN
        if ( this.props.authentication.active ) {

          this.props.resetActiveUser( {
            username: this.props.authentication.active
          } );

        }

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

  tokenCheck = () => {

    const intTokenCheck = SystemUtils.tokenCheckIsNeeded( this.props.authentication );

    if ( intTokenCheck === 1 ) { //Check needed

      //Launch token check
      this.props.tokenCheck( {
        transactionId: this.state.id,
        authorization: this.props.authentication.accounts[ this.props.authentication.active ].Authorization,
        logger: null
      } );

    }
    else {

      //0 = No authentication
      //2 = Authenticaticated but no check needed

      if ( intTokenCheck === -1 ) { //Invalid status state. Reset the state

        this.props.resetActiveUser( {
          transactionId: this.state.id,
          username: this.props.authentication.active
        } );

      }

      //if ( this.props.frontend.modalId === this.state.id ) {
      if ( intTokenCheck !== 0 ) {

        this.props.closeModalMessage( {
          transactionId: this.state.id
        } );

      }

      /*
      this.setState( {
        messageKind: "",
        title: "",
        message: ""
      } );
      */

    }

  }

  async componentDidMount() {

    intervalHandler = setInterval( () => {

      this.tokenCheck();

    }, 3000 );

    this.tokenCheck();

  }

  componentWillUnmount() {

    clearInterval( intervalHandler );

  }

  onClickButtonCheckAgainNRFSModal = ( event ) => {

    event && event.preventDefault();

    this.tokenCheck();

  }

  onClickButtonCloseModal = ( event ) => {

    event && event.preventDefault();

  }

  render() {

    let result = null;

    if ( this.state.isLoading ) {

      result = ( <Loading /> );

    }
    else {

      const isAuthenticated = !!( this.props.authentication.active );

      /*
      const showMessage = !!( this.state.modalCode && this.state.title && this.state.message );
      let modalMessage = null;

      if ( showMessage && this.state.modalCode === "NOTIFICATION" ) {

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

        modalMessage = (

          <MessageModal
            showMe={ showMessage }
            title={ this.state.title }
            message={ this.state.message }
            buttons={ buttons }
          />

        );

      }
      else if ( showMessage && this.state.modalCode === "NO_RESPONSE_FROM_SERVER" ) {

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

        modalMessage = (

          <MessageModal
            showMe={ showMessage }
            title={ this.state.title }
            message={ this.state.message }
            buttons={ buttons }
          />

        );

      }
      */

      // dark theme
      const classes = classNames(
        "c-app c-default-layout",
        this.props.frontend.themeDark ? "c-dark-theme" : false
        //this.state.themeDark ? "c-dark-theme" : false
      );

      result = (

        <div className={ classes }>
          {
            isAuthenticated ? <LeftSidebar /> : null
          }
          <div className="c-wrapper">
            <CHeader withSubheader>
              <Suspense fallback={ <Loading /> }>
                <Header />
              </Suspense>
            </CHeader>
            <div className="c-body">
              <Suspense fallback={ <Loading /> }>
                {
                  isAuthenticated ? <Content /> : <Loading />
                }
              </Suspense>
            </div>
            <CFooter className="d-sm-flex justify-content-center" fixed>
              <Suspense fallback={ <Loading /> }>
                <Footer />
              </Suspense>
            </CFooter>
          </div>
          {/* modalMessage */}
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
  deleteResult,
  resetActiveUser,
  toggleDark,
  showModalMessage,
  closeModalMessage
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
