import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import './styles.sass'
import App from './components/app/app';
import {Provider} from 'react-redux';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App/>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
