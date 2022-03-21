import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Auth0Provider } from "@auth0/auth0-react";
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <Auth0Provider
    domain="foodboot.eu.auth0.com"
    clientId="YlvUPydGmFgScfKnME23uN4DFWbEJooy"
    redirectUri={window.location.origin} >

    <Provider store={store}>
      <App />
    </Provider>

  </Auth0Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
