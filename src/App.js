//NPM LIB
import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
//STATE STORE
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store/store';
//CONTAINERS
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import ResetPassword from "./containers/Forgot Password/ResetPassword";
//COMPONENTS
import Home from "./components/Home/Home";
import Support from './containers/Support/Support';
import FAQ from "./components/Faq/FAQs";
//Grid

import EmterOtp from './containers/Forgot Password/EnterOtp'



import Admin from './Controller'

import Error from './Layout/404NotFound/404'
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/home" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/resetpassword" component={ResetPassword} />
              <Route path="/support" exact component={Support} />
              <Route path="/validate_otp" exact component={EmterOtp} />
              <Route path="/faq" component={FAQ} />
              <Admin />
              <Route component={Error} />
            </Switch>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}


export default App;


