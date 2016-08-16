// Set up your application entry point here...

/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/style.scss';
//import './styles/semantic.css'
//import { syncHistoryWithStore } from 'react-router-redux';
import App from './containers/App';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app')
);
