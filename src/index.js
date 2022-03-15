import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider }  from "react-redux";
import { HashRouter } from "react-router-dom";
import reducers from "./reducers"
import App from './App';

const store= createStore(reducers);

ReactDOM.render(
  <HashRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
