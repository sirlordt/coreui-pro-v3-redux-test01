import React from "react";
import {
  HashRouter
} from "react-router-dom";
import {
  Provider
} from "react-redux";

import mainStore from "./redux/store";

import "./App.scss";
import Loading from "./components/loading";

// Containers
//const Home = React.lazy( () => import( "./components/home" ) );
//const LoginModal = React.lazy( () => import( "./components/loginModal" ) );
const Root = React.lazy( () => import( "./components/root" ) );

function App() {

  return (
    <Provider store={ mainStore }>
      <HashRouter>
        <React.Suspense fallback={ <Loading /> }>
          <Root />
        </React.Suspense>
      </HashRouter>
    </Provider>
  );

}

export default App;
