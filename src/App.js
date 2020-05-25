import React from "react";
import {
  HashRouter
} from "react-router-dom";
import {
  Provider
} from "react-redux";

import "./utils/icons";

import mainStore from "./redux/store";

import "./App.scss";
import Loading from "./components/loading";

// Containers
//const Home = React.lazy( () => import( "./components/home" ) );
//const LoginModal = React.lazy( () => import( "./components/loginModal" ) );
const RootPage = React.lazy( () => import( "./pages/root" ) );

function App() {

  return (
    <Provider store={ mainStore }>
      <HashRouter>
        <React.Suspense fallback={ <Loading /> }>
          <RootPage />
        </React.Suspense>
      </HashRouter>
    </Provider>
  );

}

export default App;
