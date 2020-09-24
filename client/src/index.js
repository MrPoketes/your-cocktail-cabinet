import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import store from "./stores/configureStore";
import Navigation from "./containers/Navigation";
ReactDOM.render(
  <Provider store={store}>
    <Navigation />
  </Provider>,
  document.getElementById('root')
);

