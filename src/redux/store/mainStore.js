import {
  createStore,
  applyMiddleware,
  compose
} from "redux";
import thunkMiddleware from "redux-thunk";

import rootReducer from "../reducers";
import CommonUtilities from "../../utils/commonUtilities";

import initialState from "../reducers/initialState";

//import { forbiddenWordsMiddleware } from "../middlewares";

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStateAccountsData = CommonUtilities.parseJSON( localStorage.getItem( "_ACCOUNTS_DATA" ), null );

if ( initialStateAccountsData ) {

  initialState.authentication.active = initialStateAccountsData.active;
  initialState.authentication.accounts = initialStateAccountsData.accounts;

}

const mainStore = createStore(
  rootReducer,
  initialState,
  storeEnhancers( applyMiddleware( thunkMiddleware ) ) //forbiddenWordsMiddleware,
);

//console.log( mainStore.getState() );

export default mainStore;
