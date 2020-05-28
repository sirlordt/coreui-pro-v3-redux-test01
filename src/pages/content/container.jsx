/* eslint-disable react/no-array-index-key */
import React, {
  Component, Suspense
} from "react";
import {
  Redirect, Route, Switch
} from "react-router-dom";
import {
  CContainer
} from "@coreui/react";
import Loading from "../../components/loading";

// routes config
import routes from "../../routes";

class container extends Component {

  render() {

    return (

      <main className="c-main">
        <CContainer fluid>
          <Suspense fallback={ <Loading /> }>
            <Switch>
              {routes.map( ( route, idx ) => {

                return route.component ? (
                  <Route
                    key={ idx }
                    path={ route.path }
                    exact={ route.exact }
                    name={ route.name }
                    render={ ( props ) => (
                      <route.component { ...props } />
                    ) } />
                ) : ( null );

              } )}
              <Redirect from="/" to="/home/test01" />
            </Switch>
          </Suspense>
        </CContainer>
      </main>

    );

  }

}

export default container;
