import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

store = createStore(noteReducer);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
