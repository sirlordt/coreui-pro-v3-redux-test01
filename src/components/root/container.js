import React, {
  Component
} from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

// Containers
const Home = React.lazy( () => import( "../home" ) );
const Login = React.lazy( () => import( "../login" ) );

/*
const modalPages = [
  "/login"
];

const defaultLocation = {
  pathname: "/home"
};
*/

class Root extends Component {

  componentDidUpdate() {

    /*
    const {
      location
    } = this.props;

    if ( this.shouldUpdatePreviousLocation() ) {

      this.previousLocation = location;

    }
    */

  }

  /*
  shouldUpdatePreviousLocation = () => {

    const {
      location
    } = this.props;

    if ( !location ) return false;

    return !modalPages.includes( location.pathname );

  }

  shouldUsePreviousLocation = () => {

    const {
      location
    } = this.props;

    if ( !location ) return false;

    return modalPages.includes( location.pathname );

  }
  */

  render() {

    /*
    const {
      location
    } = this.props;
    */

    /*
    const usePreviousLocation = this.shouldUsePreviousLocation();

    let forcedLocation;

    if ( usePreviousLocation ) {

      forcedLocation = this.previousLocation || defaultLocation;

    }
    else {

      forcedLocation = location;

    }
    */

    return (

      <React.Fragment>

        <Switch>

          {/*location={ forcedLocation } { pathname: "/home" }
          <Route exact path="/login" name="Login Page" render={ ( props ) => <Login { ...props } /> } />
          <Route exact path="/register" name="Register Page" render={ ( props ) => <Register { ...props } /> } />
          <Route exact path="/404" name="Page 404" render={ ( props ) => <Page404 { ...props } /> } />
          <Route exact path="/500" name="Page 500" render={ ( props ) => <Page500 { ...props } /> } />
          */}
          <Route exact path="/login" name="Login Page" render={ ( props ) => <Login { ...props } /> } />
          <Route exact path="/home" name="Home Page" render={ ( props ) => <Home { ...props } /> } />
          <Redirect from="/" to="/home" />

        </Switch>


        {/*

          usePreviousLocation && <Route exact path="/login" name="Login Modal" render={ ( props ) => <LoginModal { ...props } /> } />

        */}

      </React.Fragment>

    );

  }

}

export default withRouter( Root );
