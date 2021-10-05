import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ReactDOM.render(
  <div className=***REMOVED***process.env.REACT_APP_DEV ? 'is-dev' : ''***REMOVED***>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
